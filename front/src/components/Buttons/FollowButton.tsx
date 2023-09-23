// React
import React from "react";

//Lens
import {
  ProfileFragment,
  ProfileOwnedByMeFragment,
  useFollow,
  useUnfollow,
} from "@lens-protocol/react-web";

interface FollowButtonProps {
  followee: ProfileFragment;
  follower: ProfileOwnedByMeFragment;
}

export default function FollowButton({
  followee,
  follower,
}: FollowButtonProps) {
  const { execute: follow, isPending: isPendingFollow } = useFollow({
    followee,
    follower,
  });

  const { execute: unfollow, isPending: isPendingUnfollow } = useUnfollow({
    followee,
    follower,
  });

  return (
    <>
      {followee.followStatus && followee.followStatus.canFollow ? (
        <button
          className="px-[17px] py-[9px] bg-indigo-400 border-1 border-indigo-600 text-white rounded-lg h-1/2"
          onClick={() => follow()}
          disabled={isPendingFollow}
        >
          Follow
        </button>
      ) : (
        <button
          className="px-[17px] py-[9px] border-1 border-red-600 text-red-600 rounded-lg h-1/2"
          onClick={() => unfollow()}
          disabled={isPendingUnfollow}
        >
          Following
        </button>
      )}
    </>
  );
}
