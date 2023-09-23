// React
import React from "react";
// Images
import Image from "next/image";
// Worldcoin
import { CredentialType, IDKitWidget } from "@worldcoin/idkit";
// Images
import Worldcoin from "../../../public/Worldcoin.svg";

interface WorldCoinButtonProps {
  getWorldCoin: (worldcoin: boolean) => void;
}

export default function WorldCoinButton({
  getWorldCoin,
}: WorldCoinButtonProps) {
  return (
    <IDKitWidget
      app_id="app_staging_76ad8d38ddf44d210df3389f2ec3251f"
      action="verified"
      onSuccess={() => getWorldCoin(true)}
      credential_types={["orb" as CredentialType, "phone" as CredentialType]}
      enableTelemetry
    >
      {({ open }) => (
        <button
          onClick={open}
          className="bg-indigo-700 rounded-lg font-medium text-white tracking-wide text-sm w-full py-[9px] mt-[20px] flex items-center justify-center"
        >
          <Image src={Worldcoin.src} height={40} width={40} alt="Logo Image" />
          <span>Verify with World ID</span>
        </button>
      )}
    </IDKitWidget>
  );
}
