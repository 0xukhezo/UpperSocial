// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {DataTypes as LensDataTypes} from '../DataTypes.sol';

/**
 * @title ILensHub
 * @author Lens Protocol
 *
 * @notice This is the interface for the LensHub contract, the main entry point for the Lens Protocol.
 * You'll find all the events and external functions, as well as the reasoning behind them here.
 */
interface ILensHub {
  /**
   * @notice Publishes a post to a given profile, must be called by the profile owner.
   *
   * @param vars A PostData struct containing the needed parameters.
   *
   * @return uint256 An integer representing the post's publication ID.
   */
  function post(LensDataTypes.PostData calldata vars) external returns (uint256);

  /**
   * @notice Publishes a post to a given profile via signature with the specified parameters.
   *
   * @param vars A PostWithSigData struct containing the regular parameters and an EIP712Signature struct.
   *
   * @return uint256 An integer representing the post's publication ID.
   */
  function postWithSig(LensDataTypes.PostWithSigData calldata vars) external returns (uint256);

  /**
   * @notice Publishes a comment to a given profile, must be called by the profile owner.
   *
   * @param vars A CommentData struct containing the needed parameters.
   *
   * @return uint256 An integer representing the comment's publication ID.
   */
  function comment(LensDataTypes.CommentData calldata vars) external returns (uint256);

  /**
   * @notice Publishes a comment to a given profile via signature with the specified parameters.
   *
   * @param vars A CommentWithSigData struct containing the regular parameters and an EIP712Signature struct.
   *
   * @return uint256 An integer representing the comment's publication ID.
   */
  function commentWithSig(
    LensDataTypes.CommentWithSigData calldata vars
  ) external returns (uint256);

  /**
   * @notice Publishes a mirror to a given profile, must be called by the profile owner.
   *
   * @param vars A MirrorData struct containing the necessary parameters.
   *
   * @return uint256 An integer representing the mirror's publication ID.
   */
  function mirror(LensDataTypes.MirrorData calldata vars) external returns (uint256);

  /**
   * @notice Publishes a mirror to a given profile via signature with the specified parameters.
   *
   * @param vars A MirrorWithSigData struct containing the regular parameters and an EIP712Signature struct.
   *
   * @return uint256 An integer representing the mirror's publication ID.
   */
  function mirrorWithSig(LensDataTypes.MirrorWithSigData calldata vars) external returns (uint256);

  /**
   * @notice Follows the given profiles, executing each profile's follow module logic (if any) and minting followNFTs to the caller.
   *
   * NOTE: Both the `profileIds` and `datas` arrays must be of the same length, regardless if the profiles do not have a follow module set.
   *
   * @param profileIds The token ID array of the profiles to follow.
   * @param datas The arbitrary data array to pass to the follow module for each profile if needed.
   *
   * @return uint256[] An array of integers representing the minted follow NFTs token IDs.
   */
  function follow(
    uint256[] calldata profileIds,
    bytes[] calldata datas
  ) external returns (uint256[] memory);

  /**
   * @notice Follows a given profile via signature with the specified parameters.
   *
   * @param vars A FollowWithSigData struct containing the regular parameters as well as the signing follower's address
   * and an EIP712Signature struct.
   *
   * @return uint256[] An array of integers representing the minted follow NFTs token IDs.
   */
  function followWithSig(
    LensDataTypes.FollowWithSigData calldata vars
  ) external returns (uint256[] memory);

  /**
   * @notice Collects a given publication, executing collect module logic and minting a collectNFT to the caller.
   *
   * @param profileId The token ID of the profile that published the publication to collect.
   * @param pubId The publication to collect's publication ID.
   * @param data The arbitrary data to pass to the collect module if needed.
   *
   * @return uint256 An integer representing the minted token ID.
   */
  function collect(
    uint256 profileId,
    uint256 pubId,
    bytes calldata data
  ) external returns (uint256);

  /**
   * @notice Collects a given publication via signature with the specified parameters.
   *
   * @param vars A CollectWithSigData struct containing the regular parameters as well as the collector's address and
   * an EIP712Signature struct.
   *
   * @return uint256 An integer representing the minted token ID.
   */
  function collectWithSig(
    LensDataTypes.CollectWithSigData calldata vars
  ) external returns (uint256);

  /**
   * @dev Helper function to emit a detailed followNFT transfer event from the hub, to be consumed by frontends to track
   * followNFT transfers.
   *
   * @param profileId The token ID of the profile associated with the followNFT being transferred.
   * @param followNFTId The followNFT being transferred's token ID.
   * @param from The address the followNFT is being transferred from.
   * @param to The address the followNFT is being transferred to.
   */
  function emitFollowNFTTransferEvent(
    uint256 profileId,
    uint256 followNFTId,
    address from,
    address to
  ) external;

  /**
   * @dev Helper function to emit a detailed collectNFT transfer event from the hub, to be consumed by frontends to track
   * collectNFT transfers.
   *
   * @param profileId The token ID of the profile associated with the collect NFT being transferred.
   * @param pubId The publication ID associated with the collect NFT being transferred.
   * @param collectNFTId The collectNFT being transferred's token ID.
   * @param from The address the collectNFT is being transferred from.
   * @param to The address the collectNFT is being transferred to.
   */
  function emitCollectNFTTransferEvent(
    uint256 profileId,
    uint256 pubId,
    uint256 collectNFTId,
    address from,
    address to
  ) external;

  /// ************************
  /// *****VIEW FUNCTIONS*****
  /// ************************

  /**
   * @notice Returns whether or not a profile creator is whitelisted.
   *
   * @param profileCreator The address of the profile creator to check.
   *
   * @return bool True if the profile creator is whitelisted, false otherwise.
   */
  function isProfileCreatorWhitelisted(address profileCreator) external view returns (bool);

  /**
   * @notice Returns default profile for a given wallet address
   *
   * @param wallet The address to find the default mapping
   *
   * @return uint256 The default profile id, which will be 0 if not mapped.
   */
  function defaultProfile(address wallet) external view returns (uint256);

  /**
   * @notice Returns whether or not a follow module is whitelisted.
   *
   * @param followModule The address of the follow module to check.
   *
   * @return bool True if the the follow module is whitelisted, false otherwise.
   */
  function isFollowModuleWhitelisted(address followModule) external view returns (bool);

  /**
   * @notice Returns whether or not a reference module is whitelisted.
   *
   * @param referenceModule The address of the reference module to check.
   *
   * @return bool True if the the reference module is whitelisted, false otherwise.
   */
  function isReferenceModuleWhitelisted(address referenceModule) external view returns (bool);

  /**
   * @notice Returns whether or not a collect module is whitelisted.
   *
   * @param collectModule The address of the collect module to check.
   *
   * @return bool True if the the collect module is whitelisted, false otherwise.
   */
  function isCollectModuleWhitelisted(address collectModule) external view returns (bool);

  /**
   * @notice Returns the currently configured governance address.
   *
   * @return address The address of the currently configured governance.
   */
  function getGovernance() external view returns (address);

  /**
   * @notice Returns the dispatcher associated with a profile.
   *
   * @param profileId The token ID of the profile to query the dispatcher for.
   *
   * @return address The dispatcher address associated with the profile.
   */
  function getDispatcher(uint256 profileId) external view returns (address);

  /**
   * @notice Returns the publication count for a given profile.
   *
   * @param profileId The token ID of the profile to query.
   *
   * @return uint256 The number of publications associated with the queried profile.
   */
  function getPubCount(uint256 profileId) external view returns (uint256);

  /**
   * @notice Returns the followNFT associated with a given profile, if any.
   *
   * @param profileId The token ID of the profile to query the followNFT for.
   *
   * @return address The followNFT associated with the given profile.
   */
  function getFollowNFT(uint256 profileId) external view returns (address);

  /**
   * @notice Returns the followNFT URI associated with a given profile.
   *
   * @param profileId The token ID of the profile to query the followNFT URI for.
   *
   * @return string The followNFT URI associated with the given profile.
   */
  function getFollowNFTURI(uint256 profileId) external view returns (string memory);

  /**
   * @notice Returns the collectNFT associated with a given publication, if any.
   *
   * @param profileId The token ID of the profile that published the publication to query.
   * @param pubId The publication ID of the publication to query.
   *
   * @return address The address of the collectNFT associated with the queried publication.
   */
  function getCollectNFT(uint256 profileId, uint256 pubId) external view returns (address);

  /**
   * @notice Returns the follow module associated witha  given profile, if any.
   *
   * @param profileId The token ID of the profile to query the follow module for.
   *
   * @return address The address of the follow module associated with the given profile.
   */
  function getFollowModule(uint256 profileId) external view returns (address);

  /**
   * @notice Returns the collect module associated with a given publication.
   *
   * @param profileId The token ID of the profile that published the publication to query.
   * @param pubId The publication ID of the publication to query.
   *
   * @return address The address of the collect module associated with the queried publication.
   */
  function getCollectModule(uint256 profileId, uint256 pubId) external view returns (address);

  /**
   * @notice Returns the reference module associated witha  given profile, if any.
   *
   * @param profileId The token ID of the profile that published the publication to querythe reference module for.
   * @param pubId The publication ID of the publication to query the reference module for.
   *
   * @return address The address of the reference module associated with the given profile.
   */
  function getReferenceModule(uint256 profileId, uint256 pubId) external view returns (address);

  /**
   * @notice Returns the handle associated with a profile.
   *
   * @param profileId The token ID of the profile to query the handle for.
   *
   * @return string The handle associated with the profile.
   */
  function getHandle(uint256 profileId) external view returns (string memory);

  /**
   * @notice Returns the publication pointer (profileId & pubId) associated with a given publication.
   *
   * @param profileId The token ID of the profile that published the publication to query the pointer for.
   * @param pubId The publication ID of the publication to query the pointer for.
   *
   * @return tuple First, the profile ID of the profile the current publication is pointing to, second, the
   * publication ID of the publication the current publication is pointing to.
   */
  function getPubPointer(uint256 profileId, uint256 pubId) external view returns (uint256, uint256);

  /**
   * @notice Returns the URI associated with a given publication.
   *
   * @param profileId The token ID of the profile that published the publication to query.
   * @param pubId The publication ID of the publication to query.
   *
   * @return string The URI associated with a given publication.
   */
  function getContentURI(uint256 profileId, uint256 pubId) external view returns (string memory);

  /**
   * @notice Returns the profile token ID according to a given handle.
   *
   * @param handle The handle to resolve the profile token ID with.
   *
   * @return uint256 The profile ID the passed handle points to.
   */
  function getProfileIdByHandle(string calldata handle) external view returns (uint256);

  /**
   * @notice Returns the full profile struct associated with a given profile token ID.
   *
   * @param profileId The token ID of the profile to query.
   *
   * @return ProfileStruct The profile struct of the given profile.
   */
  function getProfile(uint256 profileId) external view returns (LensDataTypes.ProfileStruct memory);

  /**
   * @notice Returns the full publication struct for a given publication.
   *
   * @param profileId The token ID of the profile that published the publication to query.
   * @param pubId The publication ID of the publication to query.
   *
   * @return PublicationStruct The publication struct associated with the queried publication.
   */
  function getPub(
    uint256 profileId,
    uint256 pubId
  ) external view returns (LensDataTypes.PublicationStruct memory);

  /**
   * @notice Returns the publication type associated with a given publication.
   *
   * @param profileId The token ID of the profile that published the publication to query.
   * @param pubId The publication ID of the publication to query.
   *
   * @return PubType The publication type, as a member of an enum (either "post," "comment" or "mirror").
   */
  function getPubType(
    uint256 profileId,
    uint256 pubId
  ) external view returns (LensDataTypes.PubType);

  /**
   * @notice Returns the follow NFT implementation address.
   *
   * @return address The follow NFT implementation address.
   */
  function getFollowNFTImpl() external view returns (address);

  /**
   * @notice Returns the collect NFT implementation address.
   *
   * @return address The collect NFT implementation address.
   */
  function getCollectNFTImpl() external view returns (address);
}
