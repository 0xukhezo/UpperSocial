// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title APECoin
 * @dev ERC20 minting logic
 */
contract ApeCoin is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // NOTHING TO DO
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    function mint(uint256 value) public returns (bool) {
        _mint(msg.sender, value);
        return true;
    }

    function mintToAddress(uint256 value, address addr) public returns (bool) {
        _mint(addr, value);
        return true;
    }
}
