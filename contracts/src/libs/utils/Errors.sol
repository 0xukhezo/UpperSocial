// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

/**
 * @title Errors library
 * @author Daniel
 */
library Errors {
    ///////////////////////////////////////////
    ///   GENERIC
    ///////////////////////////////////////////

    error AccessDenied(string paramName);
    error ZeroAddress(string paramName);
    error ZeroAmount();

    error InsufficientBalance(address token);

    error AssetNotAllowed(address token);
    error AdapterNotAllowed();
    error NotEquals(string paramName);
    error TimestampExpired();
    error TimestampNotExpired();
    error NotImplemented();
    error InvalidAddress();
    error InvalidParam(string paramName);
    error InvalidParams();
    error AlreadySet(string param);
    error ArrayLengthMismatch(string details);
    error ItemNotFound();
    error ItemExists();
    error MissingRole(bytes32 role, address user);
    error RegistryItemMissing(string item);
    error NotRegistered();

    error NotEnoughLiquidity();
    error NotEnoughBalance();
    error AmountExceedsDebt();
    error AmountExceedsBalance();
    error AmountToLow();
    error ApprovalFailed(address token);
    error NotAdmin();

    ///////////////////////////////////////////
    ///   FUNCTIONS
    ///////////////////////////////////////////
    function verifyNotZero(
        address addr,
        string memory paramName
    ) internal pure {
        if (addr == address(0)) {
            revert ZeroAddress(paramName);
        }
    }

    function verifyNotZero(bytes32 key, string memory paramName) internal pure {
        if (key == bytes32(0)) {
            revert InvalidParam(paramName);
        }
    }

    function verifyNotEmpty(
        string memory val,
        string memory paramName
    ) internal pure {
        if (bytes(val).length == 0) {
            revert InvalidParam(paramName);
        }
    }

    function verifyNotZero(uint256 num, string memory paramName) internal pure {
        if (num == 0) {
            revert InvalidParam(paramName);
        }
    }

    function verifyAreEquals(
        address ad1,
        address ad2,
        string memory paramName
    ) internal pure {
        if (ad1 != ad2) {
            revert NotEquals(paramName);
        }
    }

    function verifyAreEquals(
        uint256 pa1,
        uint256 pa2,
        string memory paramName
    ) internal pure {
        if (pa1 != pa2) {
            revert NotEquals(paramName);
        }
    }

    function verifyNotExpiredTimestamp(
        uint256 endTimestamp,
        uint256 nowTimestamp
    ) internal pure {
        if (endTimestamp <= nowTimestamp) {
            revert TimestampExpired();
        }
    }

    function verifyExpiredTimestamp(
        uint256 endTimestamp,
        uint256 nowTimestamp
    ) internal pure {
        if (endTimestamp > nowTimestamp) {
            revert TimestampNotExpired();
        }
    }

    // function verifyIsTrue(bool condition, string memory paramName) {}

    function verifyArrayLengths(
        uint256 length1,
        uint256 length2,
        string memory details
    ) internal view {
        if (length1 != length2) {
            revert ArrayLengthMismatch(details);
        }
    }
}
