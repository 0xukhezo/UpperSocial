// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {console} from "forge-std/console.sol";
import "forge-std/Test.sol";
import "../src/libs/logic/PriceLogic.sol";

contract PriceTest is Test {
    uint256 internal constant SUPPLY = 888;
    uint256 internal constant FIRST_PRICE = 1 ether;

    function setUp() public {}

    function testFirstMint() public {
        uint256 k = PriceLogic.getPrice(SUPPLY, 1);

        console.log(FIRST_PRICE * k);
    }

    function testSetNumber(uint256 x) public {}
}
