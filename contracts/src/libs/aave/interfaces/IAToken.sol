// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IScaledBalanceToken} from "./IScaledBalanceToken.sol";

/**
 * @title IAToken
 * @author Aave
 * @notice Defines the basic interface for an AToken.
 */
interface IAToken is IERC20, IScaledBalanceToken {

}
