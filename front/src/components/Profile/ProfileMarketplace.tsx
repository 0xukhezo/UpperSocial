import React from "react";
import Image from "next/image";

import Rectangle from "../../../public/Rectangle.png";

export default function Marketplace() {
  return (
    <div className="border-1 border-gray-200 bg-gray-50 rounded-lg mt-[20px] mb-[40px] mx-4 h-[222px] ">
      <div className="flex justify-between mb-[20px] p-[24px]">
        <h2 className="font-semibold text-lg">Marketplace</h2>
        <button className="text-gray-500 text-sm">View All</button>
      </div>
      <div className="overflow-auto ml-[24px]">
        <div className="relative whitespace-nowrap flex flex-row w-[606px]">
          <Image
            width={177}
            height={119}
            alt="Coin Image"
            src={Rectangle.src}
            className="mr-[6px] min-w-[177px]"
          />{" "}
          <Image
            width={177}
            height={119}
            alt="Coin Image"
            src={Rectangle.src}
            className="mr-[6px] min-w-[177px]"
          />{" "}
          <Image
            width={177}
            height={119}
            alt="Coin Image"
            src={Rectangle.src}
            className="mr-[6px] min-w-[177px]"
          />
          <Image
            width={177}
            height={119}
            alt="Coin Image"
            src={Rectangle.src}
            className="mr-[12px] min-w-[177px]"
          />
        </div>
      </div>
    </div>
  );
}
