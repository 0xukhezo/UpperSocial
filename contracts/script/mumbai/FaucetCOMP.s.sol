// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../helpers/DeployerHelper.sol";
import "../helpers/Fauceteer.sol";

contract DeployFauceteerScript is DeployerHelper {
    address private immutable FAUCETEER =
        0x1Cea3a83BA17692cEa8DB37D72446f014480F3bE;
    address private immutable USDC = 0xDB3cB4f2688daAB3BFf59C24cC42D4B6285828e9;

    function run() external broadcast {
        Fauceteer fau = Fauceteer(FAUCETEER);

        fau.drip(USDC);
    }
}
