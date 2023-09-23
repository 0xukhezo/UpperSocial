import {
  AnyPublication,
  ProfileId,
  useProfile,
  usePublications,
} from "@lens-protocol/react-web";
import Loader from "../Loader/Loader";
import UpperSocial from "../../../public/UpperSocial.svg";
import Identicon from "identicon.js";
import { useEffect, useState } from "react";
import PostCard from "../Cards/PostCard";
import { PencilIcon } from "@heroicons/react/24/outline";
import { formatNumber } from "@/utils/formatNumber";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";

import FollowButton from "../Buttons/FollowButton";

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
                    : { backgroundImage: `url('${UpperSocial.src}')` }
                }
              >
                <div className=" ml-[32px] pt-[181px] flex">
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
                      height={158}
                      width={158}
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
                            <FollowButton
                              followee={profile}
                              follower={myProfile}
                            />
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
            <div className="mt-[124px] px-[12px] text-gray-500">
              {profile?.bio}
            </div>

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
          <section className="overflow-auto h-full">2 Section</section>
        </div>
      ) : (
        <div className="grid h-screen place-items-center">
          <span className="mb-32">
            This profile does not currently exist in lens.
          </span>
        </div>
      )}
    </>
  );
}
