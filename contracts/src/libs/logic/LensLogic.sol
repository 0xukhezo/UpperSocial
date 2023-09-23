// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../lens/interfaces/ILensHub.sol";

library LensLogic {
    // ERRORS
    error NoLensProfile();
    error NoDefaultProfileSelected();

    // LOGICS
    function verifyOwnership(address lens, uint256 lensId) internal view {
        if (IERC721(lens).ownerOf(lensId) == msg.sender) revert NoLensProfile();
    }

    // NOT FOR NOW
    // function getProfile(
    //     address lens
    // ) internal view returns (LensDataTypes.ProfileStruct memory) {
    //     uint256 profileId = ILensHub(lens).defaultProfile(msg.sender);
    //     if (profileId == 0) {
    //         revert NoDefaultProfileSelected();
    //     }
    //     return ILensHub(lens).getProfile(profileId);
    // }
}
