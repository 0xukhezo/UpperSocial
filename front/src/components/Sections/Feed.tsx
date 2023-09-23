import React from "react";
import TrendingCreatorCard from "../Cards/TrendingCreatorCard";
import PostForm from "../Forms/PostForm";
import { ProfileOwnedByMe, useProfilesOwnedBy } from "@lens-protocol/react-web";
import InfiniteFeed from "../Feeds/InfiniteFeed";
import LeaderBoard from "../ShowCards/LeaderBoard";

interface FeedProps {
  wallet: string;
}
export default function Feed({ wallet }: FeedProps) {
  const { data: profiles } = useProfilesOwnedBy({
    address: wallet,
    limit: 10,
  });

  return (
    <div className="grid grid-cols-2 gap-x-[70px] ">
      <section className="flex flex-col overflow-auto h-screen px-4">
        <h1 className="font-semibold text-2xl">Home</h1>
        {profiles && <PostForm publisher={profiles[0] as ProfileOwnedByMe} />}
        <div className="flex flex-row gap-x-[32px] mx-[12px] text-gray-700 my-[34px]">
          <span>Subscriptions</span> <span>For you</span>
          <span>Hot Purchases</span> <span>Hot Fragments</span>
        </div>
        {profiles && <InfiniteFeed profileId={profiles[0].id} />}
      </section>
      <section className="flex flex-col">
        <h2 className="mb-[24px] ml-[24px] font-semibold text-lg">
          Trending Creators
        </h2>
        <div className="mb-[30px]">
          <TrendingCreatorCard handle={"stani.lens"} />{" "}
          <TrendingCreatorCard handle={"ethglobal.lens"} />{" "}
          <TrendingCreatorCard handle={"christina.lens"} />
        </div>
        <LeaderBoard />
      </section>
    </div>
  );
}
