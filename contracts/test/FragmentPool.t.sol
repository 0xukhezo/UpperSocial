// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.19;
import {console} from "forge-std/console.sol";
import "forge-std/StdJson.sol";
import {stdStorage, StdStorage, Test, Vm} from "forge-std/Test.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../src/libs/configs/Manager.sol";
import "../src/CreatorFactory.sol";
import "../src/FragmentPool.sol";
import "./mock/ApeCoin.sol";

contract FragmentPoolTest is Test {
    address immutable test_user = 0xF70c1cEa8909563619547128A92dd7CC965F9657;
    address immutable TREASURY = 0x2adB75AB75957Cb1A13c23191E153aF167fe7f73;
    // AAVE
    address immutable AAVE = 0xcC6114B983E4Ed2737E9BD3961c9924e6216c704;
    address immutable WETH = 0xc199807AF4fEDB02EE567Ed0FeB814A077de4802;
    address immutable AWETH = 0xAba444af64ad33A6d8575b8A353226997d6A126a;

    // COMPOUND
    address immutable USDC = 0xDB3cB4f2688daAB3BFf59C24cC42D4B6285828e9;
    address immutable CUSDC = 0xF09F0369aB0a875254fB565E52226c88f10Bc839;

    // LENS
    address immutable LENS = 0x60Ae865ee4C725cd04353b5AAb364553f56ceF82;

    // Admin
    uint256 public _adminPK = 0xC0C00DEAD;
    address internal _admin = vm.addr(_adminPK);
    // Paco
    uint256 public _userPK = 0x111111DEAD;
    address internal _user = vm.addr(_userPK);

    // Paco
    uint256 public _executorPK = 0xEEEEEDEAD;
    address internal _executor = vm.addr(_executorPK);

    address internal _treasury = address(0x1);
    address internal _userTwo = address(0x2);

    CreatorFactory internal _factory;
    ApeCoin internal _token;
    Manager internal _manager;

    function setUp() public virtual {
        uint256 mumbaiFork = vm.createFork("mumbai", 40439525);
        vm.selectFork(mumbaiFork);
        _token = new ApeCoin("APECOIN", "ACO");
        _token.mintToAddress(
            1000000000000000000000000000000000000000000000000000000,
            _user
        );
        _token.mintToAddress(
            1000000000000000000000000000000000000000000000000000000,
            test_user
        );
        vm.startPrank(_admin);
        console.log("admin", _admin);
        _manager = new Manager(_admin, _admin, _executor);

        Pricing pricing = new Pricing();
        _manager.setLens(LENS);

        _manager.setAave(AAVE);
        _manager.setAAsset(WETH, AWETH);

        _manager.setCAsset(USDC, CUSDC);
        _manager.setPricing(address(pricing));
        // SETTING MARKET

        _manager.setMarket(WETH, DataTypes.Markets.AAVE);
        _manager.setMarket(USDC, DataTypes.Markets.COMP);
        _manager.setMarket(address(_token), DataTypes.Markets.NONE);

        _factory = new CreatorFactory(address(_manager));

        vm.stopPrank();
    }

    function create_pool() public {
        vm.startPrank(test_user);
        _factory.createPool(address(_token), 0x91f3);

        vm.stopPrank();
    }

    function test_buy_fragment() public {
        vm.recordLogs();
        create_pool();

        Vm.Log[] memory entries = vm.getRecordedLogs();
        address instance = address(
            uint160(uint256(entries[entries.length - 1].topics[2]))
        );

        DataTypes.ConfigPool memory config = FragmentPool(instance).getConfig();
        console.log(
            "BUY : ---------------------------------------------------------"
        );
        vm.startPrank(test_user);
        uint256 buyPrice = FragmentPool(instance).getBuyPrice(1);

        _token.approve(instance, buyPrice);
        FragmentPool(instance).buyFragment(1); // First fragment creator

        assertEq(IERC20(config.token).balanceOf(test_user), 1);

        vm.stopPrank();
        console.log(
            "BUY : ---------------------------------------------------------"
        );
        vm.startPrank(_user);
        uint256 buyPrice2 = FragmentPool(instance).getBuyPrice(2);

        _token.approve(instance, buyPrice2);
        FragmentPool(instance).buyFragment(2); // First fragment creator

        assertEq(IERC20(config.token).balanceOf(_user), 2);

        vm.stopPrank();
        console.log(
            "BUY : ---------------------------------------------------------"
        );
        vm.startPrank(_user);

        uint256 buyPrice3 = FragmentPool(instance).getBuyPrice(2);
        _token.approve(instance, buyPrice3);
        FragmentPool(instance).buyFragment(2); // First fragment creator

        assertEq(IERC20(config.token).balanceOf(_user), 4);
        console.log("BALANCE: ", IERC20(config.token).totalSupply());
        vm.stopPrank();
        console.log(
            "SELL : ---------------------------------------------------------"
        );
        vm.startPrank(_user);
        uint256 sellPrice = FragmentPool(instance).getSellPrice(3);

        IERC20(config.token).approve(instance, 3);
        FragmentPool(instance).sellFragment(3); // First fragment creator

        assertEq(IERC20(config.token).balanceOf(_user), 1);

        vm.stopPrank();

        console.log("BALANCE: ", IERC20(config.token).totalSupply());
    }
}
