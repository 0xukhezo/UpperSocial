pragma solidity ^0.8.0;

import "forge-std/Vm.sol";
import "forge-std/StdJson.sol";
import "forge-std/Script.sol";

import "@openzeppelin/contracts/utils/Strings.sol";

contract DeployerHelper is Script {
    using stdJson for string;

    struct Addresses {
        address deployer;
        address apeCoin;
        address creatorFactory;
        address manager;
    }

    string constant path = "./deployments/deploy-";

    modifier broadcast() {
        vm.startBroadcast();
        _;
        vm.stopBroadcast();
    }

    modifier onlyInChain(uint256 chainId) {
        require(chainId == getChainID(), "chainId not valid");
        _;
    }

    function _decodeJson() internal returns (Addresses memory) {
        try vm.readFile(getFilePath()) returns (string memory persistedJson) {
            Addresses memory addresses = Addresses({
                deployer: abi.decode(
                    persistedJson.parseRaw(".deployer"),
                    (address)
                ),
                apeCoin: abi.decode(
                    persistedJson.parseRaw(".apeCoin"),
                    (address)
                ),
                creatorFactory: abi.decode(
                    persistedJson.parseRaw(".creatorFactory"),
                    (address)
                ),
                manager: abi.decode(
                    persistedJson.parseRaw(".manager"),
                    (address)
                )
            });

            return addresses;
        } catch {
            Addresses memory newaddresses = Addresses({
                deployer: address(0),
                apeCoin: address(0),
                creatorFactory: address(0),
                manager: address(0)
            });
            _encodeJson(newaddresses);
            return newaddresses;
        }
    }

    function _encodeJson(Addresses memory addresses) internal {
        string memory json = "addresses";

        vm.serializeAddress(json, "deployer", addresses.deployer);
        vm.serializeAddress(json, "apeCoin", addresses.apeCoin);
        vm.serializeAddress(json, "manager", addresses.manager);
        string memory output = vm.serializeAddress(
            json,
            "creatorFactory",
            addresses.creatorFactory
        );

        vm.writeJson(output, getFilePath());
    }

    // Old compatibility for all the networks
    function getChainID() internal view returns (uint256) {
        uint256 id;
        assembly {
            id := chainid()
        }
        return id;
    }

    function getFilePath() internal view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    abi.encodePacked(path, Strings.toString(getChainID())),
                    ".json"
                )
            );
    }
}
