// Utils
import { formatNumber } from "@/utils/formatNumber";
// React
import React, { useState } from "react";
// Next
import Image from "next/image";
// Images
import UpperCoin from "../../../public/UpperCoin.svg";
// Components
import WorldCoinButton from "../Buttons/WorldCoinButton";

export default function VoteCard() {
  const [selection, setSelection] = useState(true);
  const [fragmentsAmount, setFragmentsAmount] = useState<number>(0);
  const [worldcoin, setWorldcoin] = useState<boolean>(false);

  const handleFragmentsAmountChange = (val: string) => {
    setFragmentsAmount(Number(val));
  };

  const getWorldCoin = (success: boolean) => {
    setWorldcoin(success);
  };

  return (
    <div className="flex flex-col ml-[24px] mt-[26px]">
      <div className="shadow-xl max-w-[448px] px-[20px] py-[24px] rounded-lg">
        <h2 className="mb-[12px] font-semibold text-lg">Vote the Proposal</h2>
        <div className="flex items-center">
          <Image
            width={22}
            height={22}
            alt="Coin Image"
            src={UpperCoin.src}
            className="mr-[8px]"
          />
          <span className="text-gray-500 text-sm font-medium">
            {formatNumber(334)} available
          </span>
        </div>
        <div className="mt-[24px]">
          <div className="flex flex-row justify-between px-[40px]">
            <button
              className={selection ? "font-bold" : "font-normal"}
              onClick={() => setSelection(true)}
            >
              Yes
            </button>{" "}
            <button
              className={!selection ? "font-bold" : "font-normal"}
              onClick={() => setSelection(false)}
            >
              No
            </button>
          </div>
          <div className="flex justify-between my-[24px] px-[10px] py-[12px] border-1 border-gray-200 bg-gray-100 rounded-lg font-semibold">
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
          {worldcoin ? (
            <button className="bg-indigo-700 rounded-lg font-medium text-white tracking-wide text-sm w-full py-[9px] mt-[20px] flex items-center justify-center">
              <span>Vote {selection}</span>
            </button>
          ) : (
            <WorldCoinButton getWorldCoin={getWorldCoin} />
          )}
        </div>
      </div>
    </div>
  );
}
