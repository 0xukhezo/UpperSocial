# include .env file and export its env vars
# (-include to ignore error if it does not exist)
-include .env

# deps
update:; forge update

# Build & test
build  :; forge build --sizes --via-ir
test   :; forge test -vvv

# Utilities
download :; cast etherscan-source --chain ${chain} -d src/etherscan/${chain}_${address} ${address}
git-diff :
	@mkdir -p diffs
	@printf '%s\n%s\n%s\n' "\`\`\`diff" "$$(git diff --no-index --diff-algorithm=patience --ignore-space-at-eol ${before} ${after})" "\`\`\`" > diffs/${out}.md

# Deploys
deploy-mum-ape :; forge script script/mumbai/ApeCoin.s.sol:DeployApeCoinScript --fork-url ${RPC_MUMBAI} --broadcast --private-key ${PRIVATE_KEY} --legacy --verify --etherscan-api-key ${ETHERSCAN_API_KEY_MUMBAI}  -vvvv
deploy-mum-config :; forge script script/mumbai/Configuration.s.sol:DeployConfigurationScript --fork-url ${RPC_MUMBAI} --broadcast --private-key ${PRIVATE_KEY} --legacy --verify --etherscan-api-key ${ETHERSCAN_API_KEY_MUMBAI}  -vvvv 
deploy-mum-protocol :; forge script script/mumbai/Protocol.s.sol:DeployProtocolScript --fork-url ${RPC_MUMBAI} --broadcast --private-key ${PRIVATE_KEY} --legacy --slow --verify --etherscan-api-key ${ETHERSCAN_API_KEY_MUMBAI}  -vvvv
deploy-mum-governance :; forge script script/mumbai/Governance.s.sol:DeployGovernanceScript --fork-url ${RPC_MUMBAI} --broadcast --private-key ${PRIVATE_KEY} --legacy --gas-estimate-multiplier 888888 --verify --etherscan-api-key ${ETHERSCAN_API_KEY_MUMBAI}  -vvvv
