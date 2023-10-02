// Utils
import { formatNumber } from "@/utils/formatNumber";
// React
import React, { useEffect, useState } from "react";
// Next
import Image from "next/image";
// Heroicons
import { BoltIcon } from "@heroicons/react/24/outline";
// Images
import UpperCoin from "../../../public/UpperCoin.svg";
// Abi
import abi from "../../../abis/abi.json";
// Wagmi
import { useContractRead } from "wagmi";
import Prices from "./Prices";
import WagmiButton from "../Buttons/WagmiButton";

interface FragmentSellerProps {
  name: string;
  poolAddress: string;
  fragmentTokenAddress: string;
  tokenAddress: string;
}

export default function FragmentSeller({
  name,
  poolAddress,
  fragmentTokenAddress,
  tokenAddress,
}: FragmentSellerProps) {
  const [fragmentsAmount, setFragmentsAmount] = useState<number>(1);
  const [amountToApprove, setAmountToApprove] = useState<number>(1);
  const [isSelling, setIsSelling] = useState<boolean>(false);
  const [txStatus, setTxStatus] = useState<string[]>(["notSetted", "approve"]);

  const { data: buyPrice } = useContractRead({
    address: poolAddress as `0x${string}`,
    abi: abi.abiFragmentPool,
    functionName: "getBuyPrice",
    args: [fragmentsAmount],
  });

  const handleFragmentsAmountChange = (val: string) => {
    setFragmentsAmount(Number(val));
  };

  const getTxStatus = (status: string, name: string) => {
    setTxStatus([status, name]);
  };

  useEffect(() => {
    if (isSelling) {
      setAmountToApprove(Number(fragmentsAmount));
    } else {
      setAmountToApprove(Number(buyPrice));
    }
  }, [fragmentsAmount, isSelling]);

  return (
    <div className="flex flex-col ml-[24px] mt-[16px]">
      <div className="shadow-xl max-w-[448px] px-[20px] py-[24px] rounded-lg">
        <h2 className="mb-[12px] font-semibold text-lg">Support {name}</h2>
        <div className="flex items-center">
          <Image
            width={22}
            height={22}
            alt="Coin Image"
            src={UpperCoin.src}
            className="mr-[8px]"
          />
          <span className="text-gray-500 text-sm font-medium">
            {formatNumber(22343)} available
          </span>
        </div>
        <div className="mt-[24px]">
          <div className="flex flex-row justify-between px-[">
            <button
              className={`min-w-[196px] text-center ${
                !isSelling ? "font-bold" : "font-normal"
              }`}
              onClick={() => setIsSelling(false)}
            >
              Buy
            </button>{" "}
            <button
              className={`min-w-[196px] text-center ${
                isSelling ? "font-bold" : "font-normal"
              }`}
              onClick={() => setIsSelling(true)}
            >
              Sell
            </button>
          </div>
          <div className="flex justify-between my-[24px] px-[16px] py-[12px] border-1 border-gray-200 bg-gray-100 rounded-lg font-semibold text-lg">
            <input
              value={fragmentsAmount}
              onChange={(e) => handleFragmentsAmountChange(e.target.value)}
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              step={1}
              type="number"
              name="fragmentsAmount"
              id="fragmentsAmount"
              className="outline-gray-100 bg-gray-100"
            />
            <span>Fragments</span>
          </div>
          {buyPrice ? (
            <Prices price={buyPrice as number} />
          ) : (
            <div>loading</div>
          )}

          {txStatus[0] === "success" && txStatus[1] === "approve" ? (
            isSelling ? (
              <WagmiButton
                address={poolAddress as `0x${string}`}
                abi={abi.abiFragmentPool}
                functionName={"sellFragment"}
                args={[fragmentsAmount]}
                getTxStatus={getTxStatus}
              >
                <div>Sell</div>
              </WagmiButton>
            ) : (
              <WagmiButton
                address={poolAddress as `0x${string}`}
                abi={abi.abiFragmentPool}
                functionName={"buyFragment"}
                args={[fragmentsAmount]}
                getTxStatus={getTxStatus}
              >
                <div>Buy</div>
              </WagmiButton>
            )
          ) : (
            <WagmiButton
              address={
                !isSelling
                  ? (tokenAddress as `0x${string}`)
                  : (fragmentTokenAddress as `0x${string}`)
              }
              abi={abi.abiERC20}
              functionName={"approve"}
              args={[poolAddress, amountToApprove]}
              getTxStatus={getTxStatus}
            >
              <div>Approve</div>
            </WagmiButton>
          )}
        </div>
      </div>
    </div>
  );
}
