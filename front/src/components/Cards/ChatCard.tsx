// Lens
import { useProfile } from "@lens-protocol/react-web";
// Idecon
import Identicon from "identicon.js";
// Next
import Image from "next/image";
// React
import React from "react";

interface ChatCardProps {
  handle: string;
  chatSelected: string;
}

export default function ChatCard({ handle, chatSelected }: ChatCardProps) {
  const { data: profile } = useProfile({
    handle: handle,
  });

  return (
    <div
      className={`${
        chatSelected === handle ? "bg-gray-100" : ""
      } border-y-1 px-[24px]`}
    >
      <div className="flex flex-row bg-cover items-center py-[16px]">
        {profile?.picture && "original" in profile.picture ? (
          <img
            height={50}
            width={50}
            src={profile?.picture.original.url.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            )}
            className="rounded-full  min-h-[50px]"
            alt=""
          />
        ) : (
          profile && (
            <Image
              width={50}
              height={50}
              alt="Profile Image"
              src={`data:image/png;base64,${new Identicon(
                profile.ownedBy,
                64
              ).toString()}`}
              className="rounded-full min-h-[50px]"
            />
          )
        )}
        <div className="flex flex-col ml-[14px] text-start">
          <span className="text-gray-900">
            {profile?.name
              ? profile?.name.charAt(0).toUpperCase() + profile?.name.slice(1)
              : profile &&
                profile?.handle
                  .slice(0, profile?.handle.indexOf("."))
                  .charAt(0)
                  .toUpperCase() +
                  profile?.handle
                    .slice(0, profile?.handle.indexOf("."))
                    .slice(1)}
          </span>
          <span className="text-gray-500">@{profile?.handle}</span>
        </div>
      </div>
    </div>
  );
}
