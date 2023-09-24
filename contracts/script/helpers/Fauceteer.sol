// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.19;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Fauceteer {
    /// @notice Mapping of user address -> asset address -> last time the user
    /// received that asset
    mapping(address => mapping(address => uint)) public lastReceived;

    /* errors */
    error BalanceTooLow();
    error RequestedTooFrequently();
    error TransferFailed();

    function drip(address token) public {
        uint balance = IERC20(token).balanceOf(address(this));
        if (balance <= 0) revert BalanceTooLow();

        if (block.timestamp - lastReceived[msg.sender][token] < 1 days)
            revert RequestedTooFrequently();

        lastReceived[msg.sender][token] = block.timestamp;

        bool success = IERC20(token).transfer(msg.sender, balance / 10000); // 0.01%
        if (!success) revert TransferFailed();
    }
}
