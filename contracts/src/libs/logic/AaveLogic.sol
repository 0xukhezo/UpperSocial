// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../aave/interfaces/IAToken.sol";
import "../aave/interfaces/IPool.sol";

library AaveLogic {
    function deposit(address pool, address asset, uint256 amount) internal {
        IERC20(asset).approve(pool, amount);
        IPool(pool).deposit(asset, amount, address(this), 0);
    }

    function withdraw(address pool, address asset, uint256 amount) internal {
        IPool(pool).withdraw(asset, amount, address(this));
    }

    function balanceOf(
        address aToken,
        address user
    ) internal view returns (uint256) {
        if (aToken == address(0)) return 0;
        return IAToken(aToken).scaledBalanceOf(user);
    }
}
