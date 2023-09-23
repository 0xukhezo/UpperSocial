// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {console} from "forge-std/console.sol";
import "forge-std/Test.sol";
import {PriceLogic} from "../src/libs/logic/PriceLogic.sol";

contract PriceTest is Test {
    uint256 internal constant SUPPLY = 888;
    uint256 internal constant FIRST_PRICE = 1 ether;

    function setUp() public {
        // DO NOTHING
    }

    function test_firstMin() public {
        assertEq(true, true);
    }
    // function testFirstMint() public {
    //     uint256 k = PriceLogic.calculatePriceFragment(FIRST_PRICE, 0, 1);

    //     console.log("FIRST", k);
    // }

    // function testPrice10BuyOne() public {
    //     uint256 k = PriceLogic.calculatePriceFragment(FIRST_PRICE * 4, 10, 1);
    //     console.log("K", k);
    //     console.log("FIRST 10 : ", k);
    // }

    // function testPrice10BuyTen() public {
    //     uint256 k = PriceLogic.calculatePriceFragment(FIRST_PRICE * 4, 10, 10);
    //     console.log("K", k);
    //     console.log("FIRST 10 : ", k);
    // }

    // function testPrice10BuyOneByOne() public {
    //     uint256 k = PriceLogic.calculatePriceFragment(FIRST_PRICE * 4, 10, 10);
    //     console.log("K", k);
    //     console.log("FIRST 10 : ", k);
    // }

    // function testPrice100() public {
    //     uint256 k = PriceLogic.calculatePriceFragment(FIRST_PRICE * 20, 100, 1);
    //     console.log("K", k);
    //     console.log("FIRST 100 : ", k);
    // }

    // function testPrice500() public {
    //     uint256 k = PriceLogic.calculatePriceFragment(FIRST_PRICE * 50, 500, 1);
    //     console.log("K", k);
    //     console.log("FIRST 500 : ", k);
    // }

    // function testPrice800() public {
    //     uint256 k = PriceLogic.calculatePriceFragment(FIRST_PRICE * 50, 800, 1);
    //     console.log("K", k);
    //     console.log("FIRST 800 : ", k);
    // }

    // function testPrice880() public {
    //     uint256 k = PriceLogic.calculatePriceFragment(
    //         FIRST_PRICE * 2000,
    //         880,
    //         1
    //     );
    //     console.log("K", k);
    //     console.log("FIRST 880 : ", k);
    // }
}
