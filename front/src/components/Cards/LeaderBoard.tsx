import React from "react";
import Image from "next/image";

import Bookmark from "../../../public/Bookmark.svg";
import LeaderBoardCard from "./LeaderBoardCard";

const leaders = [
  { handle: "damarnez.lens" },
  { handle: "oxkis.lens" },
  { handle: "ukhezo.lens" },
];

export default function LeaderBoard() {
  return (
    <div className="max-w-[448px] px-[24px] shadow-xl rounded-lg">
      <div className="flex justify-between py-[20px]">
        <div className="flex flex-row">
          <Image
            height={24}
            width={24}
            src={Bookmark.src}
            alt="Collection button"
            className="mr-2"
          />
          <h1>Upper Leaderboard</h1>
        </div>
        <button>View all</button>
      </div>{" "}
      <div className="flex flex-col">
        {leaders.map((leader: any, index: number) => {
          return (
            <LeaderBoardCard index={index + 1} leader={leader} key={index} />
          );
        })}
      </div>
    </div>
  );
}
