import { useProfile } from "@lens-protocol/react-web";
import Link from "next/link";
import React from "react";

interface LeaderBoardCardProps {
  index: number;
  leader: any;
}

export default function LeaderBoardCard({
  index,
  leader,
}: LeaderBoardCardProps) {
  const { data: profile, loading } = useProfile({
    handle: leader.handle,
  });

  return (
    <div>
      {loading ? (
        <div></div>
      ) : (
        <Link href={`/profiles/${profile?.handle}`}>
          <div className="flex items-center border-y-1">
            <span>
              <span className="mr-1">#</span>
              {index}
            </span>
            <div className="flex flex-row bg-cover items-center py-[20px]  px-[19px]">
              {profile?.picture && "original" in profile.picture && (
                <img
                  height={50}
                  width={50}
                  src={profile?.picture.original.url.replace(
                    "ipfs://",
                    "https://ipfs.io/ipfs/"
                  )}
                  className="rounded-full border-black border-2 min-h-[50px]"
                  alt=""
                />
              )}
              <div className="flex flex-col ml-[14px]">
                <span className="text-gray-900">{profile?.name}</span>
                <span className="text-gray-500">@{profile?.handle}</span>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
