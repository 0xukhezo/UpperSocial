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
        _token = new ApeCoin("APECOIN", "ACO");
        _token.mintToAddress(
            1000000000000000000000000000000000000000000000000000000,
            _user
        );
        _token.mintToAddress(
            1000000000000000000000000000000000000000000000000000000,
            _userTwo
        );
        _manager = new Manager(_admin, _treasury, _executor);
        _factory = new CreatorFactory(address(_manager));
    }

    function test_create_pool() public {
        assertEq(true, true);
    }
}
