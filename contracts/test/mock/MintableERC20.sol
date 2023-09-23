// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.19;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';

/**
 * @title ERC20Mintable
 * @dev ERC20 minting logic
 */
contract MintableERC20 is ERC20 {
  uint8 private _decimals;
  mapping(address => uint256) public mintValues;

  constructor(string memory name, string memory symbol, uint8 decimals_) ERC20(name, symbol) {
    _setupDecimals(decimals_);
  }

  function _setupDecimals(uint8 decimals_) internal {
    _decimals = decimals_;
  }

  function decimals() public view virtual override returns (uint8) {
    return _decimals;
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
