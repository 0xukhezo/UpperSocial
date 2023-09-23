// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../helpers/DeployerHelper.sol";
import "../../test/mock/ApeCoin.sol";

import "../../src/CreatorFactory.sol";

contract DeployGovernanceScript is DeployerHelper {
    Governance public gov;

    function run() external broadcast {
        Addresses memory addresses = _decodeJson();

        gov = new Governance(addresses.creatorFactory);

        addresses.governance = address(gov);
        Manager(addresses.manager).setGovernance(addresses.governance);

        _encodeJson(addresses);
    }
}
