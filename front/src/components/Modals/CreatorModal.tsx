import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Wagmi
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
// Abis
import abi from "../../../abis/abi.json";
// Images
import UpperCoin from "../../../public/UpperCoin.svg";
import ApeCoin from "../../../public/ApeCoin.svg";
import UsdcCoin from "../../../public/UsdcCoin.svg";
import MaticCoin from "../../../public/MaticCoin.svg";
import GhoCoin from "../../../public/GhoCoin.svg";
// Identicon
import Identicon from "identicon.js";
// Components
import TokenCard from "../Cards/TokenCard";

interface TokensModalInterface {
  getOpenModal: (openmodal: boolean) => void;
  profileId: string;
  profileAddress: string;
}

export default function TokensModal({
  getOpenModal,
  profileId,
  profileAddress,
}: TokensModalInterface) {
  const [open, setOpen] = useState(true);
  const [tokenSelected, setTokenSelected] = useState({
    address: "0x02",
    imagen: MaticCoin.src,
    symbol: "WMatic",
  });

  const creatorFactoryAddress = process.env.NEXT_PUBLIC_CREATOR_FACTORY_ADDRESS;

  const { config: creatorFactoryContractConfig } = usePrepareContractWrite({
    address: creatorFactoryAddress as `0x${string}`,
    abi: abi.abiCreatorFactory,
    functionName: "createPool",
    args: [tokenSelected.address, profileId],
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
      setOpen(false);
      getOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = (token?: any) => {
    setOpen(false);
    getOpenModal(false);
  };

  const tokens = [
    {
      address: "0x01",
      imagen: ApeCoin.src,
      symbol: "APE Coin",
      community: "162",
    },
    {
      address: "0x02",
      imagen: MaticCoin.src,
      symbol: "wMatic",
      community: "562",
    },
    { address: "0x00", imagen: UsdcCoin.src, symbol: "USDC", community: "62" },
    {
      address: "0x03",
      imagen: GhoCoin.src,
      symbol: "GHO",
      community: "0",
    },
  ];

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none "
                    onClick={() => closeModal()}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start w-full ">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <img
                      height={114}
                      width={114}
                      src={`data:image/png;base64,${new Identicon(
                        profileAddress,
                        64
                      ).toString()}`}
                      className="rounded-full max-w-[114px] max-h-[114px] mx-auto border-orange-500 border-8"
                      alt="Profile Image"
                    />
                    <img
                      height={32}
                      width={32}
                      src={UpperCoin.src}
                      className="rounded-full max-w-[32px] max-h-[32px] mx-auto absolute top-[120px] inset-x-0"
                      alt="Profile Image"
                    />
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900 flex flex-col mx-auto text-center max-w-[259px] mt-[22px]"
                    >
                      Select your community token to become a creator.
                    </Dialog.Title>
                    <div className="text-center mx-auto text-gray-500 mt-[12px] text-sm max-w-[400px]">
                      You are about to start your creation journey. Select the
                      token that you want your community to work with.{" "}
                      <span className="text-indigo-500">
                        Learn more your community token.
                      </span>
                    </div>
                    <div className="mt-2 overflow-auto h-66">
                      {tokens.map((token: any, index: number) => {
                        return (
                          <>
                            {token.community !== "0" ? (
                              <button
                                key={index}
                                onClick={() => setTokenSelected(token)}
                                className="flex items-center w-full p-2 hover:bg-gray-100 rounded-lg my-[16px]"
                              >
                                <TokenCard
                                  token={token}
                                  tokenSelected={tokenSelected}
                                />
                              </button>
                            ) : (
                              <div
                                key={index}
                                className="flex items-center w-full p-2 rounded-lg my-[16px]"
                              >
                                <TokenCard
                                  token={token}
                                  tokenSelected={tokenSelected}
                                />
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                    <div className="mt-[24px]">
                      <button
                        className="bg-indigo-700 rounded-lg font-medium text-white tracking-wide text-sm w-full py-[9px] mt-[20px] flex items-center justify-center"
                        onClick={() => onCreatorFactoryClick()}
                      >
                        <span>Turn on creator mode</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
