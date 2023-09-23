// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../configs/Manager.sol";
import "../utils/DataTypes.sol";
import "./AaveLogic.sol";
import "./CompoundLogic.sol";
import "../utils/DataTypes.sol";

library LendingLogic {
    error TooHighAmount();

    function deposit(
        DataTypes.Markets market,
        address pool,
        address asset,
        uint256 amount
    ) internal {
        if (market == DataTypes.Markets.AAVE) {
            AaveLogic.deposit(pool, asset, amount);
        } else if (market == DataTypes.Markets.COMP) {
            CompoundLogic.deposit(pool, asset, amount);
        }

        // Asset not available on defi markets
        // do nothing
    }

    function withdraw(
        DataTypes.Markets market,
        address pool,
        address asset,
        uint256 amount
    ) internal {
        if (market == DataTypes.Markets.AAVE) {
            AaveLogic.withdraw(pool, asset, amount);
        } else if (market == DataTypes.Markets.COMP) {
            CompoundLogic.withdraw(pool, asset, amount);
        }
        // Asset not available on defi markets
        // do nothing
    }

    function validateBorrowRange(
        uint256 loanId,
        uint256 totalAmount,
        uint256 amount
    ) external pure {
        if (loanId < 5) {
            uint256 maxCap = (totalAmount * 5000) / 1 ether;
            if (amount >= maxCap) revert TooHighAmount();
        } else if (loanId < 10) {
            uint256 maxCap = (totalAmount * 10000) / 1 ether;
            if (amount >= maxCap) revert TooHighAmount();
        } else if (loanId < 30) {
            uint256 maxCap = (totalAmount * 30000) / 1 ether;
            if (amount >= maxCap) revert TooHighAmount();
        } else if (loanId < 50) {
            uint256 maxCap = (totalAmount * 50000) / 1 ether;
            if (amount >= maxCap) revert TooHighAmount();
        } else {
            // By default the user never can borrow more than 70%
            uint256 maxCap = (totalAmount * 70000) / 1 ether;
            if (amount >= maxCap) revert TooHighAmount();
        }
    }
}
