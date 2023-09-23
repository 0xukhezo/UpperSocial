// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '../utils/DataTypes.sol';

library BorrowLogic {
  error TooHighAmount();

  function validateBorrowRange(uint256 loanId, uint256 totalAmount, uint256 amount) internal pure {
    if (loanId < 5) {
      uint256 maxCap = (totalAmount * 5000) / 1 ether;
      if (amount >= maxCap) revert TooHighAmount();
    } else if (loanId < 10) {
      uint256 maxCap = (totalAmount * 10000) / 1 ether;
      if (amount >= maxCap) revert TooHighAmount();
    } else if (loanId < 30) {
      uint256 maxCap = (totalAmount * 30000) / 1 ether;
      if (amount >= maxCap) revert TooHighAmount();
    } else if (loanId < 50) {
      uint256 maxCap = (totalAmount * 50000) / 1 ether;
      if (amount >= maxCap) revert TooHighAmount();
    } else {
      // By default the user never can borrow more than 70%
      uint256 maxCap = (totalAmount * 70000) / 1 ether;
      if (amount >= maxCap) revert TooHighAmount();
    }
  }
}
