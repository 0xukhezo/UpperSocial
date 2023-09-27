import React from "react";

import { ethers } from "ethers";

import { formatNumber } from "@/utils/formatNumber";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface PricesProps {
  price: number;
}

export default function Prices({ price }: PricesProps) {
  return (
    <div className="flex flex-col gap-y-[12px]">
      <div className="grid grid-cols-2">
        <div className="flex items-center">
          <span className="text-gray-500 text-sm font-base">Total cost</span>{" "}
          <InformationCircleIcon
            width={16}
            height={16}
            aria-hidden="true"
            className="text-gray-500 ml-2"
          />
        </div>
        <div className="flex items-center justify-end">
          <span className="text-gray-500 text-sm font-base">
            ≈ $
            {price
              ? formatNumber(
                  Number(
                    (Number(ethers.utils.formatEther(price)) * 0.52).toFixed(3)
                  )
                )
              : 0}
          </span>
          <span className="text-gray-900 text-lg font-semibold ml-1">
            {price ? formatNumber(Number(ethers.utils.formatEther(price))) : 0}{" "}
            MATIC
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex items-center">
          <span className="text-gray-500 text-sm font-base">Fee</span>{" "}
          <InformationCircleIcon
            width={16}
            height={16}
            aria-hidden="true"
            className="text-gray-500 ml-2"
          />
        </div>
        <div className="flex items-center justify-end">
          <span className="text-gray-500 text-sm font-base">
            ≈ $
            {price
              ? formatNumber(
                  Number(
                    (Number(ethers.utils.formatEther(price)) * 0.05).toFixed(3)
                  )
                )
              : 0}
          </span>
          <span className="text-gray-900 text-lg font-semibold ml-1">
            {formatNumber(Number(ethers.utils.formatEther(price)) * 0.05)} MATIC
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex items-center">
          <span className="text-gray-500 text-sm font-base">Gas</span>{" "}
          <InformationCircleIcon
            width={16}
            height={16}
            aria-hidden="true"
            className="text-gray-500 ml-2"
          />
        </div>
        <div className="flex items-center justify-end">
          <span className="text-gray-500 text-sm font-base">
            ≈ ${formatNumber(0.23)}
          </span>
          <span className="text-gray-900 text-lg font-semibold ml-1">
            {formatNumber(0.3)} MATIC
          </span>
        </div>
      </div>
    </div>
  );
}
