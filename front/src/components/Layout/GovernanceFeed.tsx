import { formatNumber } from "@/utils/formatNumber";
import React from "react";
import VoteCard from "../Cards/VoteCard";
import PieChart from "../Chart/PieChart";

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
        <div className="max-w-[124px] mx-auto">
          <PieChart
            noVotes={proposalSelected.no}
            yesVotes={proposalSelected.yes}
          />
        </div>
        <div className="grid grid-cols-2 text-center">
          <div className="max-w-[175px]">
            <h2>Yes</h2>
            <div className="grid grid-cols-2">
              <span>{proposalSelected.yes}</span> <span>122</span>
            </div>
          </div>
          <div className="max-w-[175px]">
            <h2>No</h2>
            <div className="grid grid-cols-2">
              <span>{proposalSelected.no}</span> <span>122</span>
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
