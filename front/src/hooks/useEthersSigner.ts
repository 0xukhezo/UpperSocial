import * as React from "react";
import { type WalletClient, useWalletClient, useNetwork } from "wagmi";
import { providers } from "ethers";

export function walletClientToSigner(walletClient: WalletClient, chain: any) {
  const { account, transport } = walletClient;

  const network = {
    chainId: chain?.id,
    name: chain?.name,
    ensAddress: chain?.contracts?.ensRegistry?.address,
  };

  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

export function useEthersSigner() {
  const { data: walletClient } = useWalletClient();
  const { chain } = useNetwork();
  return React.useMemo(
    () =>
      walletClient ? walletClientToSigner(walletClient, chain) : undefined,
    [walletClient, chain]
  );
}
