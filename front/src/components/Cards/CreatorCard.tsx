import React from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import abi from "../../../abis/abi.json";

export default function CreatorCard() {
  const creatorFactoryAddress = process.env.NEXT_PUBLIC_CREATOR_FACTORY_ADDRESS;

  const { config: creatorFactoryContractConfig } = usePrepareContractWrite({
    address: creatorFactoryAddress as `0x${string}`,
    abi: abi.abiCreatorFactory,
    functionName: "createPool",
    args: [],
  });

  const { writeAsync: creatorFactoryContractTx, data: dataCreatorFactory } =
    useContractWrite(creatorFactoryContractConfig);

  const { isSuccess: txSuccessSellFragment } = useWaitForTransaction({
    confirmations: 3,
    hash: dataCreatorFactory?.hash,
  });

  const onCreatorFactoryClick = async () => {
    try {
      await creatorFactoryContractTx?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col ml-[24px] mt-[26px]">
      <div className="shadow-xl max-w-[448px] px-[20px] py-[24px] rounded-lg">
        <h2 className="mb-[12px] font-semibold text-lg">Become a creator</h2>
        <span>
          Become an Upper Creator, start creating content and get paid for it.
        </span>
        <div className="mt-[24px]">
          <button
            className="bg-indigo-700 rounded-lg font-medium text-white tracking-wide text-sm w-full py-[9px] mt-[20px] flex items-center justify-center"
            onClick={() => onCreatorFactoryClick()}
          >
            <span>Become a Creator</span>
          </button>
        </div>
      </div>
    </div>
  );
}
