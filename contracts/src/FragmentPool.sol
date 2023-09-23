// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {console} from "forge-std/console.sol";

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./libs/gov/TimeLock.sol";
import "./FragmentGovernance.sol";
import "./libs/utils/DataTypes.sol";
import "./libs/tokens/FragmentToken.sol";

contract FragmentPool is AccessControl, Initializable {
    using SafeERC20 for IERC20;
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant GOV_ROLE = keccak256("GOV_ROLE");

    // If the comunity whant to disable a creator
    bool _isDisabled;

    address internal _creator;
    uint256 internal _userId;

    FragmentToken internal _token;
    FragmentGovernance internal _governance;
    TimelockController internal _timelock;

    ///////////////////////////////////
    // ERRORS
    /////////////////////////////////

    error CreatorNeedToBuyFirst();
    error WrongAmount();
    error CreatorDisabled();

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
        _creator = config.user;

        _token = new FragmentToken(config.userId, config.totalSupply);
        address[] memory proposers = new address[](1);
        proposers[0] = config.user;
        address[] memory executors;
        executors[0] = address(0); // TODO: Admin?

        _timelock = new TimeLock(0, proposers, executors, address(0));

        _governance = new FragmentGovernance(config.userId, _token, _timelock);

        _grantRole(DEFAULT_ADMIN_ROLE, config.admin);
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
}
