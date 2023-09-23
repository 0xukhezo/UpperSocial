// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

library DataTypes {
    struct ConfigPool {
        uint256 userId;
        address user;
        address underlyingAsset;
        address manager;
        address admin;
    }
}
