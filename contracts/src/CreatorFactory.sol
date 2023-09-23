// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {console} from "forge-std/console.sol";

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./libs/proxy/FragmentUpgradeableProxy.sol";
import "./libs/utils/DataTypes.sol";
import "./libs/utils/Errors.sol";
import "./libs/configs/Manager.sol";
import "./libs/logic/LensLogic.sol";
import "./FragmentPool.sol";

contract CreatorFactory {
    using Clones for address;
    using SafeERC20 for IERC20;

    ///////////////////////////////////
    // ERRORS
    ///////////////////////////////////

    error UserAlreadyExist();

    ///////////////////////////////////

    /////////////////////////////
    Manager internal _manager;

    uint256 internal _userCounter = 1;
    // Upgradeable by GOV
    address internal _admin;

    address internal immutable _template = address(new FragmentPool());
    mapping(address => address) internal _pools;

    event NewFragmentPool(
        address indexed owner,
        address indexed instance,
        uint256 indexed userId
    );

    constructor(address manager) {
        _manager = Manager(manager);
    }

    function getManager() external view returns (Manager) {
        return _manager;
    }

    function createPool(
        address underlyingAsset,
        uint256 lensId
    ) external returns (address instance) {
        if (_pools[msg.sender] != address(0)) revert UserAlreadyExist();

        DataTypes.Markets market = _manager.getMarket(underlyingAsset);
        if (market == DataTypes.Markets.INVALID) revert Errors.InvalidAsset();
        // Verifciations
        address lensHub = _manager.getLens();
        Errors.verifyNotZero(lensHub, "lensHub");
        // Check if user has profile
        LensLogic.verifyOwnership(lensHub, lensId);

        // create vesting instance
        instance = _template.clone();

        uint256 userId = _userCounter;
        // Create contract upgradeable
        bytes memory data = abi.encodeWithSelector(
            FragmentPool.initialize.selector,
            DataTypes.ConfigPool({
                userId: userId,
                lensId: lensId,
                creator: msg.sender,
                underlyingAsset: underlyingAsset,
                manager: address(_manager),
                market: market
            })
        );
        // Initialize
        FragmentUpgradeableProxy proxy = new FragmentUpgradeableProxy(
            address(instance),
            Manager(_manager).getAdmin(),
            data
        );

        _pools[msg.sender] = address(proxy);
        // Increment counter
        unchecked {
            _userCounter++;
        }

        // emit event
        emit NewFragmentPool(msg.sender, address(proxy), userId);
    }
}
