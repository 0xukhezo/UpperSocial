// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title IFollowNFT
 * @author Lens Protocol
 *
 * @notice This is the interface for the FollowNFT contract, which is cloned upon the first follow for any profile.
 */
interface IFollowNFT {
  /**
   * @notice Returns the governance power for a given user at a specified block number.
   *
   * @param user The user to query governance power for.
   * @param blockNumber The block number to query the user's governance power at.
   *
   * @return uint256 The power of the given user at the given block number.
   */
  function getPowerByBlockNumber(address user, uint256 blockNumber) external view returns (uint256);

  /**
   * @notice Returns the total delegated supply at a specified block number. This is the sum of all
   * current available voting power at a given block.
   *
   * @param blockNumber The block number to query the delegated supply at.
   *
   * @return uint256 The delegated supply at the given block number.
   */
  function getDelegatedSupplyByBlockNumber(uint256 blockNumber) external view returns (uint256);
}
