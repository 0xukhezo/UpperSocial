import { formatNumber } from "@/utils/formatNumber";
import React, { useState } from "react";
import Image from "next/image";
import { BoltIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import UpperCoin from "../../../public/UpperCoin.svg";
import abi from "../../../abis/abi.json";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

interface FragmentSellerProps {
  name: string;
  poolAddress: string;
}

export default function FragmentSeller({
  name,
  poolAddress,
}: FragmentSellerProps) {
  const [fragmentsAmount, setFragmentsAmount] = useState<number>(0);
  const [isSelling, setIsSelling] = useState<boolean>(false);

  const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;
  const fragmentTokenAddress = process.env.NEXT_PUBLIC_FRAGMENT_ADDRESS;

  const { config: buyFragmentContractConfig } = usePrepareContractWrite({
    address: poolAddress as `0x${string}`,
    abi: abi.abiFragmentPool,
    functionName: "buyShares",
    args: [poolAddress, fragmentsAmount],
  });

  const { config: sellFragmentContractConfig } = usePrepareContractWrite({
    address: poolAddress as `0x${string}`,
    abi: abi.abiFragmentPool,
    functionName: "sellShares",
    args: [poolAddress, fragmentsAmount],
  });

  const { config: approveContractConfig } = usePrepareContractWrite({
    address: isSelling
      ? (fragmentTokenAddress as `0x${string}`)
      : (tokenAddress as `0x${string}`),
    abi: abi.abiERC20,
    functionName: "approve",
    args: [poolAddress, fragmentsAmount],
  });

  const { writeAsync: approveContractTx, data: dataApprove } = useContractWrite(
    approveContractConfig
  );

  const { writeAsync: sellFragmentContractTx, data: dataSellFragment } =
    useContractWrite(sellFragmentContractConfig);

  const { writeAsync: buyFragmentContractTx, data: dataBuyFragment } =
    useContractWrite(buyFragmentContractConfig);

  const { isSuccess: txSuccessSellFragment } = useWaitForTransaction({
    confirmations: 3,
    hash: dataSellFragment?.hash,
  });

  const { isSuccess: txSuccessBuyFragment } = useWaitForTransaction({
    confirmations: 3,
    hash: dataBuyFragment?.hash,
  });

  const { isSuccess: txSuccessApprove } = useWaitForTransaction({
    confirmations: 3,
    hash: dataApprove?.hash,
  });

  const onBuyFragmentClick = async () => {
    try {
      await buyFragmentContractTx?.();
    } catch (error) {
      console.log(error);
    }
  };

  const onSellFragmentClick = async () => {
    try {
      await sellFragmentContractTx?.();
    } catch (error) {
      console.log(error);
    }
  };

  const onApproveClick = async () => {
    try {
      await approveContractTx?.();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFragmentsAmountChange = (val: string) => {
    setFragmentsAmount(Number(val));
  };

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
              step="any"
              type="number"
              name="fragmentsAmount"
              id="fragmentsAmount"
              className="outline-white bg-gray-100"
            />
            <span>Fragments</span>
          </div>

          <div className="flex flex-col gap-y-[12px]">
            <div className="grid grid-cols-2">
              <div className="flex items-center">
                <span className="text-gray-500 text-sm font-base">
                  Total cost
                </span>{" "}
                <InformationCircleIcon
                  width={16}
                  height={16}
                  aria-hidden="true"
                  className="text-gray-500 ml-2"
                />
              </div>
              <div className="flex items-center justify-end">
                <span className="text-gray-500 text-sm font-base">
                  ≈ ${formatNumber(200.43)}
                </span>
                <span className="text-gray-900 text-lg font-semibold ml-1">
                  {formatNumber(200)} MATIC
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
                  ≈ ${formatNumber(2.43)}
                </span>
                <span className="text-gray-900 text-lg font-semibold ml-1">
                  {formatNumber(20)} MATIC
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
          <button
            className="bg-indigo-700 rounded-lg font-medium text-white tracking-wide text-sm w-full py-[9px] mt-[20px] flex items-center justify-center"
            onClick={() => {
              if (txSuccessApprove) {
                isSelling ? onSellFragmentClick() : onBuyFragmentClick();
              } else {
                onApproveClick();
              }
            }}
          >
            <BoltIcon
              width={24}
              height={24}
              aria-hidden="true"
              className="mr-2"
            />
            <span>
              {txSuccessApprove ? (
                <div>Up {name}</div>
              ) : (
                <div>Approve {isSelling ? "Fragments" : "ERC20"}</div>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
