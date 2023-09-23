// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

library DataTypes {
    struct ConfigPool {
        uint256 userId;
        uint256 lensId;
        address creator;
        address underlyingAsset;
        address manager;
        Markets market;
    }

    enum LoanState {
        ENDED,
        PENDING
    }

    struct Loan {
        uint256 loanId;
        uint256 amount;
        uint256 interest;
        uint256 timestamp;
        LoanState state;
    }

    enum Markets {
        INVALID,
        AAVE,
        COMP,
        NONE
    }
}
