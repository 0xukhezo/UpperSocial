// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../base/BaseERC20.sol";
import "../utils/Errors.sol";

contract DebToken is BaseERC20, Ownable {
    address internal _underlyingAsset;

    constructor(
        address underlyingAsset
    ) BaseERC20(ERC20(underlyingAsset).decimals()) {
        _name = string(
            abi.encodePacked("deb-", ERC20(underlyingAsset).symbol())
        );
        _symbol = string(
            abi.encodePacked("DEBT", ERC20(underlyingAsset).symbol())
        );
        _underlyingAsset = underlyingAsset;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }

    function getUnderlyingAsset() external view returns (address) {
        return _underlyingAsset;
    }

    function decimals() public view override(ERC20) returns (uint8) {
        return _decimals;
    }

    function _mint(address to, uint256 amount) internal override(ERC20) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20) {
        super._burn(account, amount);
    }

    /////////////////////// DISABLED FUNCTIONS ///////////////////////

    /**
     * @dev Being non transferrable, the debt token does not implement any of the
     * standard ERC20 functions for transfer and allowance.
     **/
    function transfer(
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        recipient;
        amount;
        revert Errors.NotImplemented();
    }

    function allowance(
        address owner,
        address spender
    ) public view virtual override returns (uint256) {
        owner;
        spender;
        revert Errors.NotImplemented();
    }

    function approve(
        address spender,
        uint256 amount
    ) public virtual override returns (bool) {
        spender;
        amount;
        revert Errors.NotImplemented();
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        sender;
        recipient;
        amount;
        revert Errors.NotImplemented();
    }

    function increaseAllowance(
        address spender,
        uint256 addedValue
    ) public virtual override returns (bool) {
        spender;
        addedValue;
        revert Errors.NotImplemented();
    }

    function decreaseAllowance(
        address spender,
        uint256 subtractedValue
    ) public virtual override returns (bool) {
        spender;
        subtractedValue;
        revert Errors.NotImplemented();
    }
}
