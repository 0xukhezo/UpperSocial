// React
import React from "react";
// Next
import Image from "next/image";
// Heroicons
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface TokenCardInterface {
  token: any;
  tokenSelected: any;
}

export default function TokenCard({
  token,
  tokenSelected,
}: TokenCardInterface) {
  return (
    <div className="flex justify-between flex-row items-center w-full">
      <div className="flex flex-row">
        <Image
          width={100}
          height={100}
          alt="Token Image"
          src={token.imagen}
          className="h-12 w-12"
        />
        <div className="ml-4 flex flex-col text-start">
          <div className="text-gray-900 text-lg">{token.symbol}</div>
          {token.community !== "0" ? (
            <div className="text-gray-500 text-sm">
              {token.community} communities
            </div>
          ) : (
            <div className="text-gray-500 text-sm">Comming soon! 🎉</div>
          )}
        </div>
      </div>
      {tokenSelected.address === token.address && (
        <CheckCircleIcon
          className="text-green-500 mr-1.5"
          height={24}
          width={24}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
