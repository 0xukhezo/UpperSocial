// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../base/BaseERC20.sol";

contract FragmentToken is BaseERC20, Ownable, ERC20Votes {
    uint256 public immutable MAX_SUPPLY;

    constructor(uint256 userId, uint256 maxSupply) BaseERC20(0) {
        _name = string(abi.encodePacked("Fragment-", userId));
        _symbol = string(abi.encodePacked("FRA", userId));
        MAX_SUPPLY = maxSupply;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        // TODO: validate total supply no more max supply
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }

    function decimals() public view override(ERC20) returns (uint8) {
        return _decimals;
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(
        address account,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }
}
