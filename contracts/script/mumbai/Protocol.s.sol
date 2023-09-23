// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../helpers/DeployerHelper.sol";
import "../../src/CreatorFactory.sol";

contract DeployProtocolScript is DeployerHelper {
    function run() external broadcast {
        Addresses memory addresses = _decodeJson();
        CreatorFactory factory = new CreatorFactory(addresses.manager);
        addresses.creatorFactory = address(factory);
        _encodeJson(addresses);
    }
}
