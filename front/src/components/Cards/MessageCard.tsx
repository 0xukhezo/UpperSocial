// React
import React from "react";
// Identicon
import Identicon from "identicon.js";
// Next
import Image from "next/image";

interface MessageCardProps {
  message: any;
  address: `0x${string}` | undefined;
  profile: any;
  data: any;
}

export default function MessageCard({
  message,
  address,
  profile,
  data,
}: MessageCardProps) {
  return (
    <li
      key={message.id}
      className={
        address === message.senderAddress
          ? "justify-end flex my-2"
          : "justify-start my-2 flex"
      }
    >
      {address !== message.senderAddress &&
      profile?.picture &&
      "original" in profile.picture ? (
        <img
          height={40}
          width={40}
          src={profile?.picture.original.url.replace(
            "ipfs://",
            "https://ipfs.io/ipfs/"
          )}
          className="rounded-full min-h-[40px] mx-4"
        />
      ) : (
        address !== message.senderAddress &&
        profile && (
          <Image
            width={40}
            height={40}
            alt="Profile Image"
            src={`data:image/png;base64,${new Identicon(
              profile.ownedBy,
              64
            ).toString()}`}
            className="rounded-full min-h-[40px] mx-4"
          />
        )
      )}
      <span
        className={
          address === message.senderAddress
            ? "bg-indigo-500 text-white w-1/2 justify-end flex  py-2 px-3 rounded-lg"
            : "bg-gray-100 w-1/2 py-2 px-3 rounded-lg"
        }
      >
        {message.content}
      </span>
      {data &&
      data[0].picture &&
      "original" in data[0].picture &&
      address === message.senderAddress ? (
        <img
          height={40}
          width={40}
          src={data[0].picture.original.url.replace(
            "ipfs://",
            "https://ipfs.io/ipfs/"
          )}
          className="rounded-full min-h-[40px] mx-4"
        />
      ) : (
        data &&
        address === message.senderAddress && (
          <Image
            width={40}
            height={40}
            alt="Profile Image"
            src={`data:image/png;base64,${new Identicon(
              data[0].ownedBy,
              64
            ).toString()}`}
            className="rounded-full min-h-[40px] mx-4"
          />
        )
      )}
    </li>
  );
}
