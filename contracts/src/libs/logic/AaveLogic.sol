// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../aave/interfaces/IAToken.sol";
import "../aave/interfaces/IPool.sol";

library AaveLogic {
    function deposit(address aPool, address asset, uint256 amount) internal {
        IPool(aPool).deposit(asset, amount, address(this), 0);
    }

    function withdraw(address aPool, address asset, uint256 amount) internal {
        IPool(aPool).withdraw(asset, amount, address(this));
    }

    function balanceOf(
        address aToken,
        address user
    ) internal view returns (uint256) {
        return IAToken(aToken).scaledBalanceOf(user);
    }
}
