// React
import React from "react";
// Next
import Image from "next/image";
// Lens
import { useProfile } from "@lens-protocol/react-web";
// Identicon
import Identicon from "identicon.js";
// Images
import UpperSocial from "../../../public/UpperSocial.svg";
// Compoenents
import Link from "next/link";

interface TrendingCreatorsProps {
  handle: string;
}

export default function TrendingCreators({ handle }: TrendingCreatorsProps) {
  const { data: profile } = useProfile({
    handle: handle,
  });

  return (
    <Link href={`/profiles/${profile?.handle}`}>
      {profile && (
        <div className="relative">
          <div
            className="flex flex-row max-w-[448px] min-h-[136px] items-center px-[21px] mb-0.5 rounded-lg shadow-xl opacity-50"
            style={
              profile?.coverPicture && "original" in profile?.coverPicture
                ? {
                    backgroundImage: `url('${profile?.coverPicture.original.url.replace(
                      "ipfs://",
                      "https://ipfs.io/ipfs/"
                    )}')`,
                    backgroundSize: "cover",
                  }
                : {
                    backgroundImage: `url('${UpperSocial.src}')`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }
            }
          ></div>
          <div className="absolute top-[40px] left-[20px] flex">
            {profile?.picture && "original" in profile.picture ? (
              <img
                height={50}
                width={50}
                src={profile?.picture.original.url.replace(
                  "ipfs://",
                  "https://ipfs.io/ipfs/"
                )}
                className="rounded-full  min-h-[50px] opacity-100"
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
            <div className="flex flex-col text-black ml-[14px]">
              <span className="font-semibold text-lg">
                {profile?.name
                  ? profile?.name.charAt(0).toUpperCase() +
                    profile?.name.slice(1)
                  : profile &&
                    profile?.handle
                      .slice(0, profile?.handle.indexOf("."))
                      .charAt(0)
                      .toUpperCase() +
                      profile?.handle
                        .slice(0, profile?.handle.indexOf("."))
                        .slice(1)}
              </span>
              <span className="font-medium text-sm">@{profile?.handle}</span>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}
