// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../comp/interfaces/ICommet.sol";

library CompoundLogic {
    function deposit(address pool, address asset, uint256 amount) internal {
        IERC20(asset).approve(pool, amount);
        ICommet(pool).supply(asset, amount);
    }

    function withdraw(address pool, address asset, uint256 amount) internal {
        ICommet(pool).withdraw(asset, amount);
    }

    function balanceOf(
        address cToken,
        address user
    ) internal view returns (uint256) {
        if (cToken == address(0)) return 0;
        return ICommet(cToken).balanceOf(user);
    }
}
