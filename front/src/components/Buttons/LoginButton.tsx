// React
import React from "react";
// Next
import Image from "next/image";
// Lens
import { useWalletLogin } from "@lens-protocol/react-web";
// Wagmi
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
// Images
import Lens from "../../../public/Lens.svg";

export default function LoginButton() {
  const { execute: login, isPending: isLoginPending } = useWalletLogin();

  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });

  const onLoginClick = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      const walletClient = await connector.getWalletClient();
      await login({
        address: walletClient.account.address,
      });
    }
  };
  return (
    <button
      disabled={isLoginPending}
      onClick={onLoginClick}
      className="bg-indigo-700 px-[41px] py-[18px] rounded-lg font-medium text-white tracking-wide text-base flex"
    >
      <Image
        height={24}
        width={38}
        src={Lens.src}
        alt="and gafitti"
        className="mr-4"
      />
      <span>Connect with Lens</span>
    </button>
  );
}
