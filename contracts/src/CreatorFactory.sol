// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/Clones.sol";

import "./libs/proxy/FragmentUpgradeableProxy.sol";

import "./libs/tokens/FragmentToken.sol";
import "./libs/tokens/DebToken.sol";
import "./libs/utils/DataTypes.sol";
import "./libs/utils/Errors.sol";
import "./libs/configs/Manager.sol";
import "./libs/logic/LensLogic.sol";
import "./FragmentPool.sol";
import "./Governance.sol";

contract CreatorFactory {
    using Clones for address;

    ///////////////////////////////////
    // ERRORS
    ///////////////////////////////////

    error UserAlreadyExist();
    error UserNotExist();
    ///////////////////////////////////

    /////////////////////////////
    Manager internal _manager;
    uint256 internal _userCounter = 1;
    // Upgradeable by GOV
    address internal _admin;

    address internal immutable _template = address(new FragmentPool());
    mapping(address => address) internal _pools;

    event NewFragmentPool(
        address indexed owner,
        address indexed instance,
        uint256 indexed userId,
        address underlyingAsset,
        uint256 market,
        address fragmentToken
    );

    constructor(address manager) {
        _manager = Manager(manager);
    }

    function getManager() external view returns (Manager) {
        return _manager;
    }

    function getPool(address user) external view returns (address) {
        return _pools[user];
    }

    function createPool(
        address underlyingAsset,
        uint256 lensId
    ) external returns (address instance) {
        if (_pools[msg.sender] != address(0)) revert UserAlreadyExist();

        DataTypes.Markets market = _manager.getMarket(underlyingAsset);
        if (market == DataTypes.Markets.INVALID) revert Errors.InvalidAsset();
        // Verifciations
        address lensHub = _manager.getLens();
        Errors.verifyNotZero(lensHub, "lensHub");
        // Check if user has profile
        LensLogic.verifyOwnership(lensHub, lensId);

        // create vesting instance
        instance = _template.clone();

        uint256 userId = _userCounter;

        FragmentToken token = new FragmentToken(userId, 888);
        DebToken debToken = new DebToken(underlyingAsset);
        address pricing = Manager(_manager).getPricing();

        // Create contract upgradeable
        bytes memory data = abi.encodeWithSelector(
            FragmentPool.initialize.selector,
            DataTypes.ConfigPool({
                userId: userId,
                lensId: lensId,
                creator: msg.sender,
                underlyingAsset: underlyingAsset,
                manager: address(_manager),
                market: market,
                pricing: pricing,
                token: address(token),
                debToken: address(debToken),
                factory: address(this)
            })
        );
        // Initialize
        FragmentUpgradeableProxy proxy = new FragmentUpgradeableProxy(
            address(instance),
            Manager(_manager).getAdmin(),
            data
        );
        // Not the best way
        token.transferOwnership(address(proxy));
        debToken.transferOwnership(address(proxy));

        _pools[msg.sender] = address(proxy);
        // Increment counter
        unchecked {
            _userCounter++;
        }

        // emit event
        emit NewFragmentPool(
            msg.sender,
            address(proxy),
            userId,
            underlyingAsset,
            uint(market),
            address(token)
        );
    }
}
