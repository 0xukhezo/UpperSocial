// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {console} from "forge-std/console.sol";
import "./CreatorFactory.sol";

import "./libs/proxy/FragmentUpgradeableProxy.sol";

import "./libs/gov/FragmentGovernance.sol";
import "./libs/gov/TimeLock.sol";
import "./libs/tokens/FragmentToken.sol";
import "./libs/utils/DataTypes.sol";
import "./libs/logic/LensLogic.sol";

import "./libs/configs/Manager.sol";
import "./FragmentPool.sol";

contract Governance {
    address internal _factory;
    mapping(address => address) internal _governances;
    mapping(address => TimeLock) internal _timeLocks;
    ///////////////////////////////////
    // ERRORS
    ///////////////////////////////////

    error UserAlreadyExist();
    error UserNotExist();

    constructor(address factory) {
        _factory = factory;
    }

    function getGovernance(address user) external view returns (address) {
        return _governances[user];
    }

    function getTimeLock(address user) external view returns (address) {
        return address(_timeLocks[user]);
    }

    function create() external {
        address pool = CreatorFactory(_factory).getPool(msg.sender);
        if (pool == address(0)) revert UserNotExist();
        DataTypes.ConfigPool memory config = FragmentPool(pool).getConfig();

        _governances[msg.sender] = address(
            new FragmentGovernance(
                config.userId,
                FragmentToken(config.token),
                _timeLocks[msg.sender]
            )
        );
    }

    function createTimeLock(address user) external {
        address pool = CreatorFactory(_factory).getPool(msg.sender);
        if (pool == address(0)) revert UserNotExist();

        DataTypes.ConfigPool memory config = FragmentPool(pool).getConfig();
        // Only the creator
        address[] memory proposers = new address[](1);
        proposers[0] = user;

        _timeLocks[user] = new TimeLock(
            0,
            proposers,
            Manager(config.manager).getExecutors(),
            address(0)
        );
    }
}
