// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library PriceLogic {
    uint256 constant K = 180;

    function getPricePerFragment() internal {}

    function getPriceFramgent(
        uint256 priceFragment,
        uint256 currentSupply,
        uint256 amountToMint
    ) internal pure returns (uint256) {
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
