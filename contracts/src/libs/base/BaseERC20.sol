// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract BaseERC20 is ERC20, ERC20Permit {
    string internal _name;
    string internal _symbol;
    uint8 internal immutable _decimals;

    constructor(
        uint8 defaultDecimals
    ) ERC20(_name, _symbol) ERC20Permit(_name) {
        _decimals = defaultDecimals;
    }
}
