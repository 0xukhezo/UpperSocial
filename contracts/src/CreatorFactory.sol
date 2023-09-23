// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {console} from "forge-std/console.sol";

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "./libs/utils/DataTypes.sol";
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

    constructor() {}

    function createPool(
        address underlyingAsset // TODO: Only one?
    ) external returns (address instance) {
        if (_pools[msg.sender] != address(0)) revert UserAlreadyExist();
        // Verifciations

        // emit event
        emit NewFragmentPool(msg.sender, address(0), _userCounter);
    }
}
