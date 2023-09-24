// React
import React from "react";
// Components
import TrendingCreatorCard from "../Cards/TrendingCreatorCard";
import PostForm from "../Forms/PostForm";
import InfiniteFeed from "../Feeds/InfiniteFeed";
import LeaderBoard from "../ShowCards/LeaderBoard";
import PostCard from "../Cards/PostCard";
// Lens
import { ProfileOwnedByMe, useProfilesOwnedBy } from "@lens-protocol/react-web";
// Next
import Image from "next/image";
// Images
import Play from "../../../public/Play.svg";
import Photo from "../../../public/Photo.svg";

import Mock1 from "../../../public/FeedMock1.png";

// Idecon
import Identicon from "identicon.js";

interface FeedProps {
  wallet: string;
}
export default function Feed({ wallet }: FeedProps) {
  const { data: profiles } = useProfilesOwnedBy({
    address: wallet,
    limit: 10,
  });

  const feedItems = [
    {
      image: Mock1.src,
      profileImage: `data:image/png;base64,${new Identicon(
        "0xF70c1cEa8909563619547128A92dd7CC965F9657",
        64
      ).toString()}`,
      owner: "Pepe",
      profile: "pepe.lens",
      description: "Best views ever",
      likes: 45,
    },
    {
      image: "",
      profileImage: `data:image/png;base64,${new Identicon(
        "0x345c15Ea890956361au471asdA92dd7CC965F94444",
        64
      ).toString()}`,
      owner: "0xAnouon",
      profile: "anouon.lens",
      description:
        "We are back from September 22-24 in the city that never sleeps when it comes to pushing the boundaries! 🗽 New York: A nurturing ground for disrupting the way we think, shaping how we engage with this new world - and reimagining a decentralized, distributed future. Hack with some of the most skilled web3 developers, designers and product builders from all around the globe for a weekend-long adventure to advance the Ethereum ecosystem. We hope the stunning views of Pier Sixty will inspire you to try your best as you get a chance to win over $450,000 USD in prizes! Don't delay your application, spots are running out fast: ethglobal.com/newyork",
      likes: 1245,
    },
    {
      image: "",
      profileImage: `data:image/png;base64,${new Identicon(
        "0xF70c1cEa890aa63619547128A92dd7CC965F9657",
        64
      ).toString()}`,
      owner: "Daniel",
      profile: "dani.lens",
      description:
        "Being in the whitelist of upper social circles can have a significant impact on one's life and opportunities. While social stratification is a complex and often controversial topic, there are several reasons why gaining access to these exclusive circles can be important:",
      likes: 545,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-[70px] ">
      <section className="flex flex-col overflow-auto h-screen px-4">
        <h1 className="font-semibold text-2xl">Home</h1>
        {profiles && profiles.length > 0 && (
          <PostForm publisher={profiles[0] as ProfileOwnedByMe} />
        )}

        {/* Mock Demo */}
        <fieldset>
          <textarea
            name="content"
            required
            placeholder="Write a new post"
            className="border-1 px-[12px] py-[15px] rounded-lg my-[30px] min-h-[125px] w-full"
          />
          <div
            className={`flex justify-between items-center border-b-2 pb-[44px]`}
          >
            <div className="flex flex-row gap-x-[12px]">
              <Image
                height={24}
                width={24}
                src={Photo.src}
                alt="Upload Photo"
              />
              <Image height={24} width={24} src={Play.src} alt="Upload Video" />
            </div>
            <button
              className="bg-indigo-700 rounded-lg font-medium text-white tracking-wide text-sm py-[9px] px-[30px]"
              type="submit"
            >
              Create Post
            </button>
          </div>
        </fieldset>
        {/* Mock Demo */}
        <div className="flex flex-row gap-x-[32px] mx-[12px] text-gray-700 my-[34px]">
          <span>Subscriptions</span> <span>For you</span>
          <span>Hot Purchases</span> <span>Hot Fragments</span>
        </div>
        {profiles && profiles.length > 0 && (
          <InfiniteFeed profileId={profiles[0].id} />
        )}
        {/* Mock Demo */}
        {feedItems?.map((item: any, index: number) => {
          return (
            <PostCard
              image={item.image}
              profileImage={item.profileImage}
              owner={item.owner}
              profile={item.profile}
              description={item.description}
              likes={item.likes}
              key={index}
            />
          );
        })}
        {/* Mock Demo */}
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
