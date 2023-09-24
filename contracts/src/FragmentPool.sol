// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./libs/tokens/FragmentToken.sol";
import "./libs/tokens/DebToken.sol";

import "./libs/logic/LendingLogic.sol";

import "./libs/utils/DataTypes.sol";
import "./libs/gov/TimeLock.sol";

import "./libs/configs/Manager.sol";
import "./libs/configs/Pricing.sol";

import "./CreatorFactory.sol";
import "./Governance.sol";

contract FragmentPool is Initializable {
    using SafeERC20 for IERC20;

    uint256 internal _defaultInterest = 1000; // 10%

    // Only the community can disable the creator
    bool _isDisabled;
    address _factory;
    address _govManager;
    DataTypes.ConfigPool _config;

    DataTypes.Loan internal _currentLoan;

    ///////////////////////////////////
    // ERRORS
    /////////////////////////////////

    error CreatorNeedToBuyFirst();
    error WrongAmount();
    error PreviousLoanNotEnded();
    error NothingToRepay();
    error AmountNotCoverTheDebt();
    error CreatorDisabled();
    error NotAdmin();
    ///////////////////////////////////
    // EVENTS
    /////////////////////////////////
    event Trade(
        address indexed user,
        address indexed creator,
        bool isBuy,
        uint256 indexed fragmentAmount,
        uint256 totalPrice,
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

    modifier onlyAdmin() {
        if (Manager(_config.manager).getAdmin() == msg.sender)
            revert NotAdmin();
        _;
    }

    modifier onlyGov() {
        if (Governance(_govManager).getGovernance(msg.sender) == address(0))
            revert NotAdmin();
        _;
    }

    /////////////////////////////////////////////////////
    constructor() {
        // Nothing To do
    }

    function initialize(DataTypes.ConfigPool memory config) public initializer {
        // set up the configuration
        _config = config;
    }

    /////////////////////////////////////////////////////
    function enableGov() external {
        _govManager = Manager(_config.manager).getGovernance();
    }

    function getConfig() external view returns (DataTypes.ConfigPool memory) {
        return _config;
    }

    // // EMERGENCY STOP
    function disableCreator() external onlyGov {
        _isDisabled = true;
    }

    // // Borrow buy GOV
    function borrow(uint256 amount) external onlyGov isDisabled {
        // Only one loan at time
        if (_currentLoan.state == DataTypes.LoanState.PENDING)
            revert PreviousLoanNotEnded();

        DataTypes.Loan memory loan = DataTypes.Loan({
            loanId: _currentLoan.loanId > 0 ? ++_currentLoan.loanId : 1,
            interest: _defaultInterest,
            timestamp: block.timestamp,
            state: DataTypes.LoanState.PENDING
        });

        uint256 comunityFee = (amount * _defaultInterest) / 1 ether;
        DebToken(_config.debToken).mint(_config.creator, amount + comunityFee);

        LendingLogic.validateBorrowRange(
            loan.loanId,
            _getFullBalance(),
            amount
        );
        // It should  had enought liquidity on  the defi market

        LendingLogic.withdraw(
            _config.market,
            Manager(_config.manager).getPool(_config.underlyingAsset),
            _config.underlyingAsset,
            amount
        );
        // We transfer the amount to the creator
        IERC20(_config.underlyingAsset).safeTransfer(_config.creator, amount);

        _currentLoan = loan;

        emit Borrow(_config.creator, amount, _getFullBalance());
    }

    function repay(uint256 amount) external {
        // Only one loan at time
        if (_currentLoan.state == DataTypes.LoanState.ENDED)
            revert NothingToRepay();
        // They need to pay everything
        IERC20(_config.underlyingAsset).safeTransferFrom(
            msg.sender,
            address(this),
            amount
        );
        // Burn tokens
        DebToken(_config.debToken).burn(msg.sender, amount);
        // Deposit on the defi markets
        _rebalanceTokens();
        // Finalize the loan
        if (DebToken(_config.debToken).balanceOf(msg.sender) == 0) {
            _currentLoan.state = DataTypes.LoanState.ENDED;
        }
        emit Repay(
            _config.creator,
            msg.sender,
            amount,
            _currentLoan.interest,
            _getFullBalance()
        );
    }

    function rebalanceTokens() external onlyAdmin {
        _rebalanceTokens();
    }

    function getBuyPrice(uint256 amount) external view returns (uint256) {
        (uint256 totalPrice, , ) = Pricing(_config.pricing).priceBuy(
            FragmentToken(_config.token).totalSupply(),
            amount,
            _getFullBalance()
        );

        return totalPrice;
    }

    function buyFragment(uint256 amount) public isDisabled {
        (uint256 totalPrice, uint256 protocolFee, ) = Pricing(_config.pricing)
            .priceBuy(
                FragmentToken(_config.token).totalSupply(),
                amount,
                _getFullBalance()
            );

        // Get the amount price
        IERC20(_config.underlyingAsset).safeTransferFrom(
            msg.sender,
            address(this),
            totalPrice
        );

        if (protocolFee > 0) {
            // Send fees to protocol
            IERC20(_config.underlyingAsset).safeTransfer(
                Manager(_config.manager).getTreasury(),
                protocolFee
            );
        }
        // Send fragments
        FragmentToken(_config.token).mint(msg.sender, amount);
        // RebalancePosition
        _rebalanceTokens();

        emit Trade(
            msg.sender,
            _config.creator,
            true,
            1,
            totalPrice,
            protocolFee,
            0, // only on the sell
            FragmentToken(_config.token).totalSupply()
        );
    }

    function getSellPrice(uint256 amount) external view returns (uint256) {
        (uint256 totalPrice, , ) = Pricing(_config.pricing).priceSell(
            FragmentToken(_config.token).totalSupply(),
            amount,
            _getFullBalance()
        );
        return totalPrice;
    }

    function sellFragment(uint256 amount) public {
        (uint256 totalPrice, uint256 userPrice, uint256 creatorFee) = Pricing(
            _config.pricing
        ).priceSell(
                FragmentToken(_config.token).totalSupply(),
                amount,
                _getFullBalance()
            );

        // Send fragments to the poll
        FragmentToken(_config.token).burn(msg.sender, amount);
        // Withdraw specific amount
        LendingLogic.withdraw(
            _config.market,
            Manager(_config.manager).getPool(_config.underlyingAsset),
            _config.underlyingAsset,
            totalPrice
        );

        if (_isDisabled) {
            // In case the creator is disabled we don't discount the amount for the creator
            IERC20(_config.underlyingAsset).safeTransfer(
                msg.sender,
                totalPrice
            );
        } else {
            // Get the amount price for selling
            IERC20(_config.underlyingAsset).safeTransfer(msg.sender, userPrice);
            // Send fees to protocol
            IERC20(_config.underlyingAsset).safeTransfer(
                _config.creator,
                creatorFee
            );
        }

        emit Trade(
            msg.sender,
            _config.creator,
            true,
            1,
            totalPrice,
            0,
            5000, // only on the sell
            FragmentToken(_config.token).totalSupply()
        );
    }

    ///////////////////////////////////////////////
    // PRIVATE
    ///////////////////////////////////////////////
    function _rebalanceTokens() internal {
        if (_config.market != DataTypes.Markets.NONE) {
            uint256 amount = IERC20(_config.underlyingAsset).balanceOf(
                address(this)
            );
            if (amount > 0) {
                LendingLogic.deposit(
                    _config.market,
                    Manager(_config.manager).getPool(_config.underlyingAsset),
                    _config.underlyingAsset,
                    amount
                );
            }
        }
    }

    // Raw + Aave + Compound
    function _getFullBalance() internal view returns (uint256) {
        return
            Pricing(_config.pricing).getFullBalance(
                _config.manager,
                address(this),
                _config.underlyingAsset
            );
    }
}
