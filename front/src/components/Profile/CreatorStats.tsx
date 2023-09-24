// Next
import Image from "next/image";
// Images
import MaticCoin from "../../../public/MaticCoin.svg";
import UpperCoin from "../../../public/UpperCoin.svg";
// Abi
import abi from "../../../abis/abi.json";
// Utils
import { formatNumber } from "@/utils/formatNumber";
// Heroicons
import { ArrowSmallUpIcon } from "@heroicons/react/24/outline";
// Wagmi
import { useContractRead } from "wagmi";

interface CreatorStatsProps {
  fragmentPoolAddress: string;
}

export default function CreatorStats({
  fragmentPoolAddress,
}: CreatorStatsProps) {
  const { data: balance } = useContractRead({
    address: fragmentPoolAddress as `0x${string}`,
    abi: abi.abiFragmentPool,
    functionName: "getBalance",
    args: [],
  });

  const { data: selledFragments } = useContractRead({
    address: fragmentPoolAddress as `0x${string}`,
    abi: abi.abiFragmentPool,
    functionName: "getSelledFragments",
    args: [],
  });

  return (
    <section className="flex flex-col ml-[24px] mt-[24px]">
      <div className="shadow-xl max-w-[448px] px-[20px] py-[24px] rounded-lg">
        <h2 className="mb-[44px] font-semibold text-lg">Creator Stats</h2>
        <div className="grid grid-cols-2 gap-x-[40px]">
          <div className="flex flex-col gap-y-[40px]">
            {/* First col */}
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm font-medium">
                Total Balance
              </span>
              <span className="flex flex-row items-center">
                <span className="text-gray-900 text-xl font-semibold">
                  $ {formatNumber(71897)}
                </span>
                <span className="flex flex-row ml-2">
                  <ArrowSmallUpIcon
                    width={20}
                    height={20}
                    aria-hidden="true"
                    className="text-green-600 "
                  />
                  <span className="text-green-600 text-sm font-semibold">
                    122
                  </span>
                </span>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-sm font-medium">
                Avg. APR
              </span>
              <span className="flex flex-row items-center">
                <span className="text-gray-900 text-xl font-semibold">
                  12.34 %
                </span>
                <span className="flex flex-row ml-2">
                  <ArrowSmallUpIcon
                    width={20}
                    height={20}
                    aria-hidden="true"
                    className="text-green-600 "
                  />
                  <span className="text-green-600 text-sm font-semibold">
                    1.2 %
                  </span>
                </span>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-sm font-medium">
                Collected Fragments
              </span>
              <span className="flex flex-row items-center">
                <Image
                  width={22}
                  height={22}
                  alt="Coin Image"
                  src={UpperCoin.src}
                  className="mr-[8px]"
                />
                <span className="text-gray-900 text-xl font-semibold mr-1">
                  {formatNumber(22343)}
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-y-[40px]">
            {/* Second col */}
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm font-medium">
                Total Earnings
              </span>
              <span className="flex flex-row items-center">
                <span className="text-gray-900 text-xl font-semibold">
                  $ {formatNumber(122100000)}
                </span>
                <span className="flex flex-row ml-2">
                  <ArrowSmallUpIcon
                    width={20}
                    height={20}
                    aria-hidden="true"
                    className="text-green-600 "
                  />
                  <span className="text-green-600 text-sm font-semibold">
                    1.4%
                  </span>
                </span>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-sm font-medium">
                30 Days Revenue
              </span>
              <span className="flex flex-row items-center">
                <span className="text-gray-900 text-xl font-semibold">
                  $ {formatNumber(12322.16)}
                </span>
                <span className="flex flex-row ml-2">
                  <ArrowSmallUpIcon
                    width={20}
                    height={20}
                    aria-hidden="true"
                    className="text-green-600 "
                  />
                  <span className="text-green-600 text-sm font-semibold">
                    5.4%
                  </span>
                </span>
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-sm font-medium">
                Avg. Fragment Price
              </span>
              <span className="flex flex-row items-center">
                <Image
                  width={22}
                  height={22}
                  alt="Matic Image"
                  src={MaticCoin.src}
                  className="mr-[8px]"
                />
                <span className="text-gray-900 text-xl font-semibold">
                  {formatNumber(1.32)}
                </span>
                <span className="flex flex-row ml-2">
                  <ArrowSmallUpIcon
                    width={20}
                    height={20}
                    aria-hidden="true"
                    className="text-green-600 "
                  />
                  <span className="text-green-600 text-sm font-semibold">
                    8.1%
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
