import React from "react";
import { useProfilesOwnedBy } from "@lens-protocol/react-web";
import InfiniteFeed from "../Lens/InfiniteFeed";

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
      </section>
    </div>
  );
}
