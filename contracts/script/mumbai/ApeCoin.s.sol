// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../helpers/DeployerHelper.sol";
import "../../test/mock/ApeCoin.sol";

contract DeployApeCoinScript is DeployerHelper {
    ApeCoin public coin;

    function run() external broadcast {
        Addresses memory addresses = _decodeJson();
        coin = new ApeCoin("APECoin", "PoS");

        addresses.apeCoin = address(coin);

        _encodeJson(addresses);
    }
}
