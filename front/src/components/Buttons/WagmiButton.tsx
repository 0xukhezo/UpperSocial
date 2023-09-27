import React, { ReactNode, useEffect } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

interface WagmiButtonProps {
  address: `0x${string}`;
  abi: any;
  functionName: string;
  args: any[];
  children: ReactNode;
  getTxStatus: (status: string, name: string) => void;
}

export default function WagmiButton({
  address,
  abi,
  functionName,
  args,
  children,
  getTxStatus,
}: WagmiButtonProps) {
  const { config: wagmiContractConfig } = usePrepareContractWrite({
    address: address,
    abi: abi,
    functionName: functionName,
    args: args,
  });

  const { writeAsync: wagmiContractTx, data: dataWagmi } =
    useContractWrite(wagmiContractConfig);
  console.log(dataWagmi, wagmiContractTx);
  const {
    isSuccess: txSuccessWagmi,
    isLoading: txLoadingWagmi,
    isError: txErrorWagmi,
  } = useWaitForTransaction({
    confirmations: 3,
    hash: dataWagmi?.hash,
  });

  const onWagmiClick = async () => {
    try {
      await wagmiContractTx?.();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (txSuccessWagmi) {
      getTxStatus("success", functionName);
    } else if (txLoadingWagmi) {
      getTxStatus("loading", functionName);
    } else if (txErrorWagmi) {
      getTxStatus("error", functionName);
    }
  }, [txSuccessWagmi, txLoadingWagmi, txErrorWagmi]);

  return (
    <button
      className="bg-indigo-700 rounded-lg font-medium text-white tracking-wide text-sm w-full py-[9px] mt-[20px] flex items-center justify-center"
      onClick={() => onWagmiClick()}
    >
      {children}
    </button>
  );
}
