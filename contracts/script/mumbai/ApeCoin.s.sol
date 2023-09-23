// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../helpers/DeployerHelper.sol";
import "../../test/mock/ApeCoin.sol";

contract DeployApeCoinScript is DeployerHelper {
    ApeCoin public coin;

    function run() external broadcast {
        Addresses memory addresses = _decodeJson();
        if (addresses.apeCoin == address(0)) {
            coin = new ApeCoin("APECoin", "PoS");
        } else {
            coin = ApeCoin(addresses.apeCoin);
        }

        addresses.apeCoin = address(coin);

        _encodeJson(addresses);
    }
}
