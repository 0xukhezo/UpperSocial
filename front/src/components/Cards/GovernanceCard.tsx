// React
import React, { useState } from "react";
// Heroicons
import { HandThumbUpIcon } from "@heroicons/react/24/outline";

interface GovernanceCardProps {
  proposal: any;
  proposalSelected: any;
}

export default function GovernanceCard({
  proposal,
  proposalSelected,
}: GovernanceCardProps) {
  const [total, setTotal] = useState<number>(proposal.yes + proposal.no);

  return (
    <div
      className={`${
        proposalSelected?.title === proposal.title ? "bg-gray-100" : ""
      } border-y-1 px-[24px]`}
    >
      <div className="flex flex-row justify-between items-center py-[16px]">
        <div className="flex flex-col text-start">
          <span className="text-gray-900">{proposal.title}</span>{" "}
          <span className="text-gray-500 flex items-center text-sm">
            <div className="bg-green-500 h-[6px] w-[6px] rounded-full mr-1.5"></div>
            Active ends in 2 days
          </span>
        </div>{" "}
        <div className="flex flex-col ">
          <span className="text-gray-900 flex text-sm items-center">
            <HandThumbUpIcon
              className={`${
                proposal.yes > proposal.no
                  ? "text-green-500"
                  : "text-red-500 rotate-180"
              } mr-1.5`}
              height={24}
              width={24}
              aria-hidden="true"
            />
            {proposal.yes > proposal.no ? (
              <span className="text-gray-500 ">
                <span className="mr-1.5 font-semibold">Yes</span>
                wins by{" "}
                {(((proposal.yes - proposal.no) * 100) / total).toFixed(2)}%
              </span>
            ) : (
              <span className="text-gray-500 ">
                <span className="mr-1.5 font-semibold">No</span>wins by{" "}
                {(((proposal.no - proposal.yes) * 100) / total).toFixed(2)}%
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
