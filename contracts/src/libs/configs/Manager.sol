// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.19;

import "../utils/DataTypes.sol";
import "../utils/Errors.sol";

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
    mapping(address => DataTypes.Markets) internal _allowedAssets;
    // asset => aToken
    mapping(address => address) internal _aAaveAssets;

    uint256 internal constant _protocolFee = 5000;
    uint256 internal constant _creatorFee = 5000;
    uint256 internal constant _defaultSupply = 888;

    /////////////////////////////////////
    // MODIFIERS
    //////////////////////////////////

    modifier onlyAdmin() {
        if (msg.sender != _admin) revert Errors.NotAdmin();
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
        _aAaveAssets[asset] = aToken;
    }

    function getAToken(address asset) external view returns (address) {
        return _aAaveAssets[asset];
    }

    //////////////////////////////////////
    // COMPOUND
    //////////////////////////////////////
    // TODO : https://docs.compound.finance/#protocol-contracts
    // MUMBAI : USDC 0xF09F0369aB0a875254fB565E52226c88f10Bc839
    function setCompound(address compound) external onlyAdmin {
        _compound = compound;
    }

    function getCompound() external view returns (address) {
        return _compound;
    }

    //////////////////////////////////
    // MARKETS
    //////////////////////////////////

    function setMarket(
        address underlyinAsset,
        DataTypes.Markets market
    ) external onlyAdmin {
        _allowedAssets[underlyinAsset] = market;
    }

    function getMarket(
        address underlyinAsset
    ) external view returns (DataTypes.Markets) {
        return _allowedAssets[underlyinAsset];
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
