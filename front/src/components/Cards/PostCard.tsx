// React
import React from "react";
// Next
import Image from "next/image";
// Images
import Heart from "../../../public/Heart.svg";
import Comment from "../../../public/Comment.svg";
import Bookmark from "../../../public/Bookmark.svg";
// Utils
import { formatNumber } from "@/utils/formatNumber";
// Components
import LinkProfile from "../Links/LinksProfile";

interface PostCardProps {
  profile: string;
  owner: string | null;
  description: string | null;
  profileImage: any;
  likes: number;
  image: string | null;
}

export default function PostCard({
  image,
  profileImage,
  owner,
  profile,
  description,
  likes,
}: PostCardProps) {
  return (
    <div className="border-1 ">
      <div className="flex flex-row bg-cover items-center mb-[12px] mt-[32px] px-[19px]">
        {profileImage && (
          <img
            height={50}
            width={50}
            src={profileImage.replace("ipfs://", "https://ipfs.io/ipfs/")}
            className="rounded-full border-black border-2 min-h-[50px]"
            alt=""
          />
        )}
        <div className="flex flex-col ml-[14px]">
          <span className="text-gray-900">
            <LinkProfile handle={profile} owner={owner} />
          </span>
          <span className="text-gray-500">
            <LinkProfile handle={profile} owner={`@${profile}`} />
          </span>
        </div>
      </div>
      <div className="text-gray-500 mb-[20px] px-[19px] break-words">
        {description}
      </div>
      {image && (
        <img
          height={100}
          width={200}
          src={image.replace("ipfs://", "https://ipfs.io/ipfs/")}
          className="w-full mb-[16px]"
          alt=""
        />
      )}
      <div className="flex justify-between px-[21px] mb-[22px]">
        <div className="flex flex-row gap-x-[12px]">
          <Image height={24} width={24} src={Heart.src} alt="Like button" />
          <Image
            height={24}
            width={24}
            src={Comment.src}
            alt="Comment button"
          />
        </div>
        <Image
          height={24}
          width={24}
          src={Bookmark.src}
          alt="Collection button"
        />
      </div>
      <div className="px-[21px] mb-[22px] text-gray-500 ">
        {likes > 0 ? <div>{formatNumber(likes)} likes </div> : <></>}
      </div>
    </div>
  );
}
