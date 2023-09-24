// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "../configs/Manager.sol";
import {AaveLogic} from "../logic/AaveLogic.sol";
import {CompoundLogic} from "../logic/CompoundLogic.sol";
import {FragmentGovernance} from "../gov/FragmentGovernance.sol";
import {TimeLock} from "../gov/TimeLock.sol";
import {FragmentToken} from "../tokens/FragmentToken.sol";

contract Pricing {
    uint256 constant K = 160;
    uint256 constant FEE = 5000;
    uint256 constant INIT_PRICE = 0.001 ether;

    function priceBuy(
        uint256 currentFragment,
        uint256 amount,
        uint256 currentSupply
    ) external pure returns (uint256, uint256, uint256) {
        uint256 price = 0;
        if (currentFragment == 0) return (INIT_PRICE, 0, 0);
        for (uint256 i = 0; i < amount; ) {
            uint256 newBalance = currentFragment + i;
            uint priceFragment = currentSupply + price / currentFragment + i;
            price += _calculatePriceFragment(priceFragment, newBalance);

            unchecked {
                i++;
            }
        }

        uint256 protocolFee = (price * FEE) / 1 ether;
        uint256 totalPrice = price + protocolFee;

        return (totalPrice, protocolFee, 0);
    }

    function priceSell(
        uint256 currentFragment,
        uint256 amount,
        uint256 currentSupply
    ) external pure returns (uint256, uint256, uint256) {
        uint256 price = 0;
        for (uint256 i = 0; i < amount; ) {
            uint256 newBalance = currentFragment + i;
            uint priceFragment = currentSupply - price / currentFragment - i;
            price += _calculatePriceFragment(priceFragment, newBalance);

            unchecked {
                i++;
            }
        }

        uint256 creatorFee = (price * FEE) / 1 ether;
        uint256 userPrice = price - creatorFee;
        return (price, userPrice, creatorFee);
    }

    // Raw + Aave + Compound
    function getFullBalance(
        address manager,
        address fragmentPool,
        address underlyingAsset
    ) external view returns (uint256) {
        return
            IERC20(underlyingAsset).balanceOf(fragmentPool) +
            AaveLogic.balanceOf(
                Manager(manager).getAToken(underlyingAsset),
                address(this)
            ) +
            CompoundLogic.balanceOf(
                Manager(manager).getCAsset(underlyingAsset),
                address(this)
            );
    }

    /////////////////////////////////////////
    // PRIVATE

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
