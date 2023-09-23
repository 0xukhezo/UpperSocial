// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

library DataTypes {
    struct ConfigPool {
        uint256 userId;
        uint256 totalSupply;
        address user;
        address underlyingAsset;
        address admin;
    }
}
