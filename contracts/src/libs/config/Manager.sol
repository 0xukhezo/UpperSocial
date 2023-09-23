// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.19;

contract Manager {
    // General
    address internal _admin;
    address internal _treasury;
    // Gov
    address internal _executor;

    // LENS
    address internal _lens;
    // AAVE
    address internal _aave;
    // Compound
    address internal _compound;

    // Allowed assets
    mapping(address => bool) internal _allowedAssets;
    // asset => aToken
    mapping(address => address) internal _aAaveAssets;

    uint256 internal constant _protocolFee = 5000;
    uint256 internal constant _creatorFee = 5000;
    uint256 internal constant _defaultSupply = 888;

    /////////////////////////////////////
    // ERRORS

    error NotAdmin();

    modifier onlyAdmin() {
        if (msg.sender != _admin) revert NotAdmin();
        _;
    }

    constructor(address admin, address treausry, address executor) {
        _admin = admin;
        _treasury = treausry;
        _executor = executor;
    }

    //////////////////////////////////////
    // LENS
    //////////////////////////////////////
    // TODO : need to be LensHub
    // MUMBAI : 0x60Ae865ee4C725cd04353b5AAb364553f56ceF82
    function setLens(address lens) external onlyAdmin {
        _lens = lens;
    }

    function getLens() external view returns (address) {
        return _lens;
    }

    //////////////////////////////////////
    // AAVE
    ///////////////////////////////////////
    // https://docs.aave.com/developers/deployed-contracts/v3-testnet-addresses
    // WETH 0xc199807AF4fEDB02EE567Ed0FeB814A077de4802
    // POOL: 0xcC6114B983E4Ed2737E9BD3961c9924e6216c704
    function setPoolAave(address aave) external onlyAdmin {
        _aave = aave;
    }

    function getPoolAave() external view returns (address) {
        return _aave;
    }

    function setAsset(address asset, address aToken) external onlyAdmin {
        _allowedAssets[asset] = aToken;
    }

    function getAToken(address asset) external view returns (address) {
        return _allowedAssets[asset];
    }

    //////////////////////////////////

    function getDefaultSuppy() external pure returns (uint256) {
        return _defaultSupply;
    }

    function getProtocolFee() external pure returns (uint256) {
        return _protocolFee;
    }

    function getCreatorFee() external pure returns (uint256) {
        return _creatorFee;
    }

    function getTreasury() external view returns (address) {
        return _treasury;
    }

    function getAdmin() external view returns (address) {
        return _admin;
    }

    function getExecutor() external view returns (address) {
        return _executor;
    }
}
