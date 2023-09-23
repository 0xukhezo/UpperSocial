// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {console} from "forge-std/console.sol";

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./libs/tokens/FragmentToken.sol";
import "./libs/logic/PriceLogic.sol";
import "./libs/logic/AaveLogic.sol";
import "./libs/logic/LensLogic.sol";
import "./libs/logic/LendingLogic.sol";
import "./libs/utils/DataTypes.sol";
import "./libs/gov/TimeLock.sol";
import "./libs/configs/Manager.sol";
import "./FragmentGovernance.sol";
import "./CreatorFactory.sol";

contract FragmentPool is AccessControl, Initializable {
    using SafeERC20 for IERC20;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant GOV_ROLE = keccak256("GOV_ROLE");
    uint256 public constant PRICE_BASE = 1 ether; // Matic
    uint256 public constant K = 0.016 ether; // Tasa incremento

    uint256 internal _defaultInterest = 1000; // 10%

    uint256 internal _userId;
    uint256 internal _lensId;
    uint256 internal _amountSelled = 0;
    address internal _creator;
    address internal _underlyingAsset;

    // Only the community can disable the creator
    bool _isDisabled;

    Manager internal _manager;
    FragmentToken internal _token;
    FragmentGovernance internal _governance;
    TimelockController internal _timelock;
    DataTypes.Loan internal _currentLoan;
    DataTypes.Markets internal _market;

    ///////////////////////////////////
    // ERRORS
    /////////////////////////////////

    error CreatorNeedToBuyFirst();
    error WrongAmount();
    error PreviousLoanNotEnded();
    error NothingToRepay();
    error AmountNotCoverTheDebt();
    error CreatorDisabled();

    ///////////////////////////////////
    // EVENTS
    /////////////////////////////////
    event Trade(
        address user,
        address creator,
        bool isBuy,
        uint256 fragmentAmount,
        uint256 totalpPrice,
        uint256 protocolPrice,
        uint256 creatorPrice,
        uint256 supply
    );

    event Borrow(address creator, uint256 amount, uint256 supply);
    event Repay(
        address creator,
        address onBelhalfOf,
        uint256 amount,
        uint256 interest,
        uint256 supply
    );

    /////////////////////////////////////////////////////
    modifier isDisabled() {
        if (_isDisabled) revert CreatorDisabled();
        _;
    }

    /////////////////////////////////////////////////////

    function initialize(
        DataTypes.ConfigPool calldata config
    ) public initializer {
        _userId = config.userId;
        _lensId = config.lensId;
        _manager = Manager(config.manager);
        _creator = config.creator;
        _market = config.market;

        _underlyingAsset = config.underlyingAsset;
        _token = new FragmentToken(config.userId, 888);

        address[] memory proposers = new address[](1);
        proposers[0] = config.creator;
        address[] memory executors;
        executors[0] = _manager.getExecutor();
        _timelock = new TimeLock(0, proposers, executors, address(0));
        _governance = new FragmentGovernance(config.userId, _token, _timelock);

        _grantRole(DEFAULT_ADMIN_ROLE, _manager.getAdmin());
        _setupRole(GOV_ROLE, address(_governance));
    }

    /////////////////////////////////////////////////////

    function getGovernance() external view returns (address) {
        return address(_governance);
    }

    // EMERGENCY STOP
    function disableCreator() external onlyRole(GOV_ROLE) {
        _isDisabled = true;
    }

    // Borrow buy GOV
    function borrow(uint256 amount) external onlyRole(GOV_ROLE) isDisabled {
        // Only one loan at time
        if (_currentLoan.state == DataTypes.LoanState.PENDING)
            revert PreviousLoanNotEnded();

        DataTypes.Loan memory loan = DataTypes.Loan({
            loanId: _currentLoan.loanId > 0 ? ++_currentLoan.loanId : 1,
            amount: amount,
            interest: _defaultInterest,
            timestamp: block.timestamp,
            state: DataTypes.LoanState.PENDING
        });

        LendingLogic.validateBorrowRange(
            loan.loanId,
            _getFullBalance(),
            amount
        );
        // It should  had enought liquidity on  the defi market

        LendingLogic.withdraw(
            _market,
            _manager.getPool(_underlyingAsset),
            _underlyingAsset,
            amount
        );
        // We transfer the amount to the creator
        IERC20(_underlyingAsset).safeTransfer(_creator, amount);

        _currentLoan = loan;

        emit Borrow(_creator, amount, _getFullBalance());
    }

    function repay(uint256 amount) external {
        // Only one loan at time
        if (_currentLoan.state == DataTypes.LoanState.ENDED)
            revert NothingToRepay();
        // To do more easy the calculations we repay everything all at once.
        uint256 amountToRepay = _currentLoan.amount +
            ((_currentLoan.amount * _currentLoan.interest) / 1 ether);
        if (amountToRepay != amount) revert AmountNotCoverTheDebt();

        IERC20(_underlyingAsset).safeTransferFrom(
            msg.sender,
            address(this),
            amount
        );
        // Deposit on the defi markets
        _rebalanceTokens();
        // Finalize the loan
        _currentLoan.state = DataTypes.LoanState.ENDED;
        emit Repay(
            _creator,
            msg.sender,
            amount,
            _currentLoan.interest,
            _getFullBalance()
        );
    }

    function rebalanceTokens() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _rebalanceTokens();
    }

    function buyPrice(
        uint256 amount
    ) public returns (uint256, uint256, uint256) {
        uint256 price = PriceLogic.priceBuy(
            _token.balanceOf(address(this)),
            amount,
            _getFullBalance()
        );
        uint256 protocolFee = (price * Manager(_manager).getProtocolFee()) /
            1 ether;
        uint256 totalPrice = price + protocolFee;
        return (totalPrice, protocolFee, 0);
    }

    function sellPrice(
        uint256 amount
    ) public returns (uint256, uint256, uint256) {
        uint256 price = PriceLogic.priceBuy(
            _token.balanceOf(address(this)),
            amount,
            _getFullBalance()
        );
        uint256 creatorFee = (price * Manager(_manager).getCreatorFee()) /
            1 ether;
        uint256 userPrice = price - creatorFee;
        return (price, userPrice, creatorFee);
    }

    function buyFragment(uint256 amount) public isDisabled {
        uint256 currentBalance = _token.balanceOf(address(this));
        if (currentBalance == _token.totalSupply() && msg.sender != _creator) {
            revert CreatorNeedToBuyFirst();
        }
        (
            uint256 totalPrice,
            uint256 protocolFee,
            uint256 creatorFee
        ) = buyPrice(amount);
        // Get the amount price
        IERC20(_underlyingAsset).safeTransferFrom(
            msg.sender,
            address(this),
            totalPrice
        );
        // Send fees to protocol
        IERC20(_underlyingAsset).safeTransfer(
            Manager(_manager).getTreasury(),
            protocolFee
        );
        // Send fragments
        IERC20(address(_token)).safeTransfer(msg.sender, 1);
        // RebalancePosition
        _rebalanceTokens();
        unchecked {
            _amountSelled++;
        }
        emit Trade(
            msg.sender,
            _creator,
            true,
            1,
            totalPrice,
            protocolFee,
            0, // only on the sell
            _amountSelled
        );
    }

    function sellFragment(uint256 amount) public {
        (uint256 totalPrice, uint256 userPrice, uint256 creatorFee) = sellPrice(
            amount
        );

        // Send fragments to the poll
        IERC20(address(_token)).safeTransferFrom(msg.sender, address(this), 1);

        // Withdraw Amount
        AaveLogic.withdraw(
            Manager(_manager).getPoolAave(),
            _underlyingAsset,
            totalPrice
        );
        if (_isDisabled) {
            // In case the creator is disabled we don't discount the amount for the creator
            IERC20(_underlyingAsset).safeTransfer(msg.sender, totalPrice);
        } else {
            // Get the amount price for selling
            IERC20(_underlyingAsset).safeTransfer(msg.sender, userPrice);
            // Send fees to protocol
            IERC20(_underlyingAsset).safeTransfer(_creator, creatorFee);
        }
        unchecked {
            _amountSelled--;
        }
        emit Trade(
            msg.sender,
            _creator,
            true,
            1,
            totalPrice,
            0,
            creatorFee, // only on the sell
            _amountSelled
        );
    }

    ///////////////////////////////////////////////
    // PRIVATE
    ///////////////////////////////////////////////
    function _rebalanceTokens() internal {
        if (_market != DataTypes.NONE) {
            uint256 amount = IERC20(_underlyingAsset).balanceOf(address(this));
            if (amount > 0) {
                LendingLogic.deposit(
                    _manager.getPool(_underlyingAsset),
                    _underlyingAsset,
                    amount
                );
            }
        }
    }

    // Raw + Aave + Compound
    function _getFullBalance() internal returns (uint256) {
        return
            IERC20(_underlyingAsset).balanceOf(address(this)) +
            AaveLogic.balanceOf(
                _manager.getAToken(_underlyingAsset),
                address(this)
            ) +
            CompoundLogic.balanceOf(address(0), address(this));
    }
}
