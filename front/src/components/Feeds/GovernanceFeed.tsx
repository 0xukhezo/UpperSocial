// React
import React from "react";
// Utils
import { formatNumber } from "@/utils/formatNumber";
// Components
import VoteCard from "../ShowCards/VoteCard";
import PieChart from "../Chart/PieChart";
import { ArrowSmallUpIcon } from "@heroicons/react/24/outline";

interface GovernanceFeedProps {
  proposalSelected: any;
}

export default function GovernanceFeed({
  proposalSelected,
}: GovernanceFeedProps) {
  return (
    <div className="flex justify-between gap-x-[50px] m-[50px]">
      <section className="w-full">
        <h1>{proposalSelected.title}</h1>
        <div className="flex my-[33px]">
          <span className="mr-6 text-gray-700 font-semibold">
            {formatNumber(proposalSelected.no + proposalSelected.yes)}{" "}
            <span className="text-gray-500 font-normal">Followers</span>
          </span>
        </div>
        <div>
          <h2>Overview:</h2>
          <div>{proposalSelected.overview}</div>
        </div>
        <div className="my-[33px]">
          <h2>Summary</h2>
          <div>{proposalSelected.summary}</div>
        </div>
        <div>
          <h2>Requirements</h2>
          <div>{proposalSelected.requirements}</div>
        </div>
      </section>
      <section className="min-w-[350px]">
        <h2 className="text-center">Voting Results</h2>
        <div className="max-w-[124px] mx-auto mb-[32px]">
          <PieChart
            noVotes={proposalSelected.no}
            yesVotes={proposalSelected.yes}
          />
        </div>
        <div className="grid grid-cols-2 text-center">
          <div className="max-w-[175px]">
            <h2 className="mb-[8px] text-sm text-gray-500">Yes</h2>
            <div className="grid grid-cols-2">
              <span className="font-semibold text-lg text-gray-900">
                {proposalSelected.yes}
              </span>
              <span className="font-semibold text-green-500 flex">
                <ArrowSmallUpIcon
                  width={20}
                  height={20}
                  aria-hidden="true"
                  className="text-green-600 "
                />
                98
              </span>
            </div>
          </div>
          <div className="max-w-[175px]">
            <h2 className="mb-[8px] text-sm text-gray-500">No</h2>
            <div className="grid grid-cols-2">
              <span className="font-semibold text-lg text-gray-900">
                {proposalSelected.no}
              </span>{" "}
              <span className="font-semibold text-green-500 flex">
                {" "}
                <ArrowSmallUpIcon
                  width={20}
                  height={20}
                  aria-hidden="true"
                  className="text-green-600 "
                />
                34
              </span>
            </div>
          </div>
        </div>
        <div className="mt-[40px]">
          <VoteCard />
        </div>
      </section>
    </div>
  );
}
