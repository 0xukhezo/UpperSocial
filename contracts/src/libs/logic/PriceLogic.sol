// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {AaveLogic} from "./AaveLogic.sol";

library PriceLogic {
    uint256 constant K = 180;

    function priceBuy(
        address fragment,
        address underlyingAsset,
        uint256 amount
    ) internal view returns (uint256) {
        uint256 fullAmount = 0;
        uint256 currentSupply = _getBalance(underlyingAsset);
        uint256 currentFragment = IERC20(fragment).balanceOf(address(this));
        for (uint256 i = 0; i < amount; ) {
            uint256 newBalance = currentFragment + i;
            uint priceFragment = currentSupply +
                fullAmount /
                currentFragment +
                i;
            fullAmount += _calculatePriceFragment(priceFragment, newBalance);

            unchecked {
                i++;
            }
        }

        return fullAmount;
    }

    function priceSell(
        address fragment,
        address underlyingAsset,
        uint256 amount
    ) internal view returns (uint256) {
        uint256 fullAmount = 0;
        uint256 currentSupply = _getBalance(underlyingAsset);
        uint256 currentFragment = IERC20(fragment).balanceOf(address(this));
        for (uint256 i = 0; i < amount; ) {
            uint256 newBalance = currentFragment + i;
            uint priceFragment = currentSupply -
                fullAmount /
                currentFragment -
                i;
            fullAmount += _calculatePriceFragment(priceFragment, newBalance);

            unchecked {
                i++;
            }
        }

        return fullAmount;
    }

    function _getBalance(address fragment) internal view returns (uint256) {
        return IERC20(fragment).balanceOf(address(this));
    }

    function _calculatePriceFragment(
        uint256 priceFragment,
        uint256 currentSupply
    ) internal pure returns (uint256) {
        uint256 amountToMint = 1;
        uint256 sum1 = currentSupply == 0
            ? 0
            : ((currentSupply - 1) *
                (currentSupply) *
                (2 * (currentSupply - 1) + 1)) / 6;

        uint256 sum2 = currentSupply == 0 && amountToMint == 1
            ? 0
            : ((currentSupply - 1 + amountToMint) *
                (currentSupply + amountToMint) *
                (2 * (currentSupply - 1 + amountToMint) + 1)) / 6;
        uint256 summation = sum2 - sum1;
        return (priceFragment * summation) / K;
    }
}
