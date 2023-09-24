// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../helpers/DeployerHelper.sol";
import "../../src/libs/configs/Manager.sol";
import "../../src/libs/utils/DataTypes.sol";
import "../../src/libs/configs/Pricing.sol";

contract DeployConfigurationScript is DeployerHelper {
    address immutable TREASURY = 0x2adB75AB75957Cb1A13c23191E153aF167fe7f73;
    // AAVE
    address immutable AAVE = 0xcC6114B983E4Ed2737E9BD3961c9924e6216c704;
    address immutable WETH = 0xc199807AF4fEDB02EE567Ed0FeB814A077de4802;
    address immutable AWETH = 0xAba444af64ad33A6d8575b8A353226997d6A126a;
    address immutable AWMATIC = 0xaCA5e6a7117F54B34B476aB95Bf3034c304e7a81;
    address immutable WMATIC = 0xaD3C5a67275dE4b5554CdD1d961e957f408eF75a;
    // COMPOUND
    address immutable USDC = 0xDB3cB4f2688daAB3BFf59C24cC42D4B6285828e9;
    address immutable CUSDC = 0xF09F0369aB0a875254fB565E52226c88f10Bc839;

    // LENS
    address immutable LENS = 0x60Ae865ee4C725cd04353b5AAb364553f56ceF82;

    function run() external broadcast {
        Addresses memory addresses = _decodeJson();
        Pricing pricing = new Pricing();
        Manager manager = new Manager(msg.sender, TREASURY, msg.sender);
        manager.setLens(LENS);

        manager.setAave(AAVE);
        manager.setAAsset(WETH, AWETH);
        manager.setAAsset(WMATIC, AWMATIC);

        manager.setCAsset(USDC, CUSDC);
        manager.setPricing(address(pricing));
        // SETTING MARKET

        manager.setMarket(WETH, DataTypes.Markets.AAVE);
        manager.setMarket(WMATIC, DataTypes.Markets.AAVE);
        manager.setMarket(USDC, DataTypes.Markets.COMP);
        manager.setMarket(addresses.apeCoin, DataTypes.Markets.NONE);

        // save market

        addresses.manager = address(manager);

        _encodeJson(addresses);
    }
}
