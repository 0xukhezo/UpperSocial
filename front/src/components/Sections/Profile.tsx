// Lens
import {
  AnyPublication,
  ProfileId,
  useProfile,
  usePublications,
} from "@lens-protocol/react-web";
// Components
import Loader from "../Loader/Loader";
import PostCard from "../Cards/PostCard";
import CreatorStats from "../Profile/CreatorStats";
import FragmentSeller from "../Profile/FragmentSeller";
import ProfileMarketplace from "../Profile/ProfileMarketplace";
import CreatorCard from "../Cards//CreatorCard";
import FollowButton from "../Buttons/FollowButton";
// Images
import Cover from "../../../public/Cover.svg";
import Mock1 from "../../../public/FeedMock1.png";
import Mock2 from "../../../public/FeedMock2.png";
// Identicon
import Identicon from "identicon.js";
// React
import { useEffect, useState } from "react";
// Heroicons
import { PencilIcon, ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
// Utils
import { formatNumber } from "@/utils/formatNumber";
// Graph
import { client, Pools } from "../../pages/api/Pools";

interface ProfileProps {
  handle: string | string[] | undefined;
  isMyProfile: boolean;
  myProfile: any;
}

export default function Profile({
  handle,
  isMyProfile,
  myProfile,
}: ProfileProps) {
  const [feed, setFeed] = useState<AnyPublication[] | undefined>([]);
  const [pool, setPool] = useState<any>();
  const {
    data: profile,
    loading,
    error,
  } = useProfile({ handle: handle as string });
  const { data: publications } = usePublications({
    profileId: profile?.id as ProfileId,
    limit: 40,
  });

  useEffect(() => {
    const publicationsPost = publications?.filter((publication: any) => {
      return publication.__typename === "Post";
    });
    setFeed(publicationsPost);
  }, [publications]);

  async function fetchPool() {
    // fragmentPools(where: {owner: profile?.ownedBy}) {
    const queryBody = `query {
        fragmentPools(where: {owner: "0xF70c1cEa8909563619547128A92dd7CC965F9657"}) {
          id
          userId
          underlyingAsset
          fragmentToken
          transactionHash
          supply
          market
          instance
        }
      }`;

    try {
      let response = await client.query({ query: Pools(queryBody) });

      setPool(response.data.fragmentPools[0]);
    } catch (err) {
      console.log({ err });
    }
  }

  const mockFeed = [
    {
      image: Mock1.src,
      owner: "Creator",
      profile: "1695481341214.test",
      description:
        "🎥 Just wrapped up an amazing shoot at the breathtaking Grand Canyon!  Stay tuned for the epic vlog dropping this Friday! Who's excited to explore this natural wonder with me? #GrandCanyonAdventure #VlogTeaser",
      likes: 123,
    },
    {
      image: Mock2.src,
      owner: "Creator",
      profile: "1695481341214.test",
      description:
        "📢 BIG NEWS! 🎉 Our channel just hit 1 million uppers! 🥳 Thank you all for being a part of this incredible journey. To celebrate, we're giving away some awesome merch. Stay tuned for the details! #1MillionSubs #Giveaway",
      likes: 12634,
    },
    {
      image: "",
      owner: "Creator",
      profile: "1695481341214.test",
      description:
        "🎬 Ready to dive into the world of filmmaking? 📽️ Join me LIVE this Saturday at 3 PM for a Q&A session about video production tips, gear recommendations, and more. Get your questions ready! #Filmmaking101 #LiveSession",
      likes: 1344,
    },
    {
      image: "",
      owner: "Creator",
      profile: "1695481341214.test",
      description:
        "🤔 Need your input, fam! 🤗 Which genre should we tackle next on the channel? A) Thrilling Travel Vlogs ✈️ B) Hilarious Comedy Sketches 😂 C) In-depth Tech Reviews 📱 Let me know in the comments! #ContentVote #NextVideo",
      likes: 1423,
    },
    {
      image: "",
      owner: "Creator",
      profile: "1695481341214.test",
      description:
        "Behind-the-scenes sneak peek! 🌟 We're currently working on an exciting project that's been months in the making. Can you guess what it is? Clue: It involves famous landmarks and our unique spin. Stay tuned for the reveal! #SecretProject #ExcitingReveal",
      likes: 19023,
    },
  ];

  useEffect(() => {
    fetchPool();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : !error ? (
        <div className="feed grid grid-cols-2">
          <section className="max-w-[690px] overflow-auto h-screen overflow-x-hidden">
            {
              <div
                className="bg-contain bg-no-repeat bg-center h-[231px] max-w-[690px] rounded-b-xl"
                style={
                  profile?.coverPicture && "original" in profile?.coverPicture
                    ? {
                        backgroundImage: `url('${profile?.coverPicture.original.url.replace(
                          "ipfs://",
                          "https://ipfs.io/ipfs/"
                        )}')`,
                      }
                    : { backgroundImage: `url('${Cover.src}')` }
                }
              >
                <div className=" ml-[32px] pt-[200px] flex">
                  {profile?.picture && "original" in profile?.picture ? (
                    <img
                      height={158}
                      width={158}
                      src={profile?.picture.original.url.replace(
                        "ipfs://",
                        "https://ipfs.io/ipfs/"
                      )}
                      className="rounded-full border-white border-8 max-w-[158px] max-h-[158px]"
                    />
                  ) : (
                    <img
                      height={180}
                      width={180}
                      src={`data:image/png;base64,${new Identicon(
                        profile.ownedBy,
                        64
                      ).toString()}`}
                      className="rounded-full border-white border-8 max-w-[158px] max-h-[158px]"
                      alt="Profile Image"
                    />
                  )}

                  <div className="ml-[20px] flex flex-col justify-end mt-[50px] w-full">
                    <div>
                      <div className="flex justify-between">
                        {profile?.name ? (
                          <div className="text-gray-900 text-2xl font-bold">
                            {profile.name.charAt(0).toUpperCase() +
                              profile.name.slice(1)}
                          </div>
                        ) : (
                          profile && (
                            <div className="text-gray-900 text-2xl font-bold">
                              {profile.handle.charAt(0).toUpperCase() +
                                profile.handle.slice(
                                  1,
                                  profile.handle.indexOf(".")
                                )}
                            </div>
                          )
                        )}
                        {!isMyProfile ? (
                          profile && (
                            <button className="px-[17px] py-[9px] bg-indigo-400 border-1 border-indigo-600 text-white rounded-lg h-1/2">
                              Follow
                            </button>
                            // <FollowButton
                            //   followee={profile}
                            //   follower={myProfile}
                            // />
                          )
                        ) : (
                          <button className="px-[17px] py-[9px] border-1 border-gray-500 text-gray-500 rounded-lg h-1/2 flex">
                            <PencilIcon
                              className="h-6 w-6 text-gray-300 mr-3"
                              aria-hidden="true"
                            />
                            <span>Edit</span>
                          </button>
                        )}
                      </div>
                      <div className="text-gray-500 my-[10px] font-medium">
                        {handle}
                      </div>
                    </div>

                    {!isMyProfile && (
                      <div className="flex">
                        <span className="mr-6 text-gray-700 font-semibold">
                          {formatNumber(
                            profile?.stats.totalFollowers as number
                          )}{" "}
                          <span className="text-gray-500 font-normal">
                            Followers
                          </span>
                        </span>
                        <span className="mr-6 text-gray-700 font-semibold">
                          {formatNumber(
                            profile?.stats.totalFollowing as number
                          )}{" "}
                          <span className="text-gray-500 font-normal">
                            Following{" "}
                          </span>
                        </span>
                        <span className="flex items-center text-gray-700 font-semibold">
                          #123
                          <ChevronDoubleUpIcon
                            width={20}
                            height={20}
                            aria-hidden="true"
                            className="text-green-600 mx-1"
                          />{" "}
                          <span className="text-gray-500 font-normal">
                            Upper Rank
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            }
            <div className="mt-[154px] px-[12px] text-gray-500">
              {profile?.bio}
            </div>
            <ProfileMarketplace />
            <div className="px-4">
              {feed &&
                feed?.length > 0 &&
                feed.map((feedElement: any, index: number) => {
                  return (
                    <PostCard
                      image={feedElement.metadata.image}
                      profileImage={
                        feedElement.profile.picture &&
                        "original" in feedElement.profile.picture
                          ? (feedElement.profile.picture.original.url as string)
                          : `data:image/png;base64,${new Identicon(
                              feedElement.profile.ownedBy,
                              64
                            ).toString()}`
                      }
                      owner={feedElement.profile.name}
                      profile={feedElement.profile.handle}
                      description={feedElement.metadata.content}
                      likes={feedElement.stats.totalAmountOfMirrors}
                      key={index}
                    />
                  );
                })}
            </div>
          </section>
          <section className="overflow-auto h-full">
            <CreatorStats fragmentPoolAddress={pool ? pool.id : "0x"} />
            {profile?.name ? (
              <FragmentSeller
                name={profile?.name}
                poolAddress={pool ? pool.id : "0x"}
                tokenAddress={pool ? pool.underlyingAsset : "0x"}
                fragmentTokenAddress={pool ? pool.fragmentToken : "0x"}
              />
            ) : (
              profile && (
                <FragmentSeller
                  name={
                    profile.handle.charAt(0).toUpperCase() +
                    profile.handle.slice(1, profile.handle.indexOf("."))
                  }
                  poolAddress={pool ? pool.id : "0x"}
                  tokenAddress={pool ? pool.underlyingAsset : "0x"}
                  fragmentTokenAddress={pool ? pool.fragmentToken : "0x"}
                />
              )
            )}
            {isMyProfile && (
              <CreatorCard
                profileAddress={profile.ownedBy}
                profileId={profile.id}
              />
            )}
          </section>
        </div>
      ) : (
        // <div className="grid h-screen place-items-center">
        //   <span className="mb-32">
        //     This profile does not currently exist in lens.
        //   </span>
        // </div>

        //////////////////////////////
        // MOCK FOR DEMO
        /////////////////////////////

        <div className="feed grid grid-cols-2">
          <section className="max-w-[690px] overflow-auto h-screen overflow-x-hidden">
            {
              <div
                className="bg-contain bg-no-repeat bg-center h-[231px] max-w-[690px] rounded-b-xl"
                style={{ backgroundImage: `url('${Cover.src}')` }}
              >
                <div className=" ml-[32px] pt-[200px] flex">
                  <img
                    height={180}
                    width={180}
                    src={`data:image/png;base64,${new Identicon(
                      "0xF70c1cEa8909563619547128A92dd7CC965F9657",
                      64
                    ).toString()}`}
                    className="rounded-full border-white border-8 max-w-[158px] max-h-[158px]"
                    alt="Profile Image"
                  />

                  <div className="ml-[20px] flex flex-col justify-end mt-[50px] w-full">
                    <div>
                      <div className="flex justify-between">
                        <div className="text-gray-900 text-2xl font-bold">
                          Creator
                        </div>
                        {!isMyProfile ? (
                          profile && (
                            <button className="px-[17px] py-[9px] bg-indigo-400 border-1 border-indigo-600 text-white rounded-lg h-1/2">
                              Follow
                            </button>
                            // <FollowButton
                            //   followee={profile}
                            //   follower={myProfile}
                            // />
                          )
                        ) : (
                          <button className="px-[17px] py-[9px] border-1 border-gray-500 text-gray-500 rounded-lg h-1/2 flex">
                            <PencilIcon
                              className="h-6 w-6 text-gray-300 mr-3"
                              aria-hidden="true"
                            />
                            <span>Edit</span>
                          </button>
                        )}
                      </div>
                      <div className="text-gray-500 my-[10px] font-medium">
                        {handle}
                      </div>
                    </div>

                    {!isMyProfile && (
                      <div className="flex">
                        <span className="mr-6 text-gray-700 font-semibold">
                          {formatNumber(12444443)}{" "}
                          <span className="text-gray-500 font-normal">
                            Followers
                          </span>
                        </span>
                        <span className="mr-6 text-gray-700 font-semibold">
                          {formatNumber(232)}{" "}
                          <span className="text-gray-500 font-normal">
                            Following{" "}
                          </span>
                        </span>
                        <span className="flex items-center text-gray-700 font-semibold">
                          #123
                          <ChevronDoubleUpIcon
                            width={20}
                            height={20}
                            aria-hidden="true"
                            className="text-green-600 mx-1"
                          />{" "}
                          <span className="text-gray-500 font-normal">
                            Upper Rank
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            }
            <div className="mt-[154px] px-[12px] text-gray-500"></div>
            <ProfileMarketplace />
            <div className="px-4">
              {mockFeed.map((feedElement: any, index: number) => {
                return (
                  <PostCard
                    image={feedElement.image}
                    profileImage={`data:image/png;base64,${new Identicon(
                      "0xF70c1cEa8909563619547128A92dd7CC965F9657",
                      64
                    ).toString()}`}
                    owner={feedElement.owner}
                    profile={feedElement.profile}
                    description={feedElement.description}
                    likes={feedElement.likes}
                    key={index}
                  />
                );
              })}
            </div>
          </section>
          <section className="overflow-auto h-full">
            {pool && <CreatorStats fragmentPoolAddress={pool.id} />}
            {pool && (
              <FragmentSeller
                name={"Creator"}
                poolAddress={pool.id}
                tokenAddress={pool.underlyingAsset}
                fragmentTokenAddress={pool.fragmentToken}
              />
            )}
            {isMyProfile && !pool && (
              <CreatorCard
                profileAddress={"0xF70c1cEa8909563619547128A92dd7CC965F9657"}
                profileId={"0x91f3"}
              />
            )}
          </section>
        </div>
      )}
    </>
  );
}
