// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.19;

/**
 * @title Compound's Comet Interface
 * @notice An efficient monolithic money market protocol
 * @author Compound
 */
interface ICommet {
    function totalSupply() external view returns (uint256);

    function totalBorrow() external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function supply(address asset, uint amount) external;

    function supplyTo(address dst, address asset, uint amount) external;

    function supplyFrom(
        address from,
        address dst,
        address asset,
        uint amount
    ) external;

    function withdraw(address asset, uint amount) external;

    function withdrawTo(address to, address asset, uint amount) external;

    function withdrawFrom(
        address src,
        address to,
        address asset,
        uint amount
    ) external;
}
