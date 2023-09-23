import React from "react";
import Image from "next/image";
import { useProfile } from "@lens-protocol/react-web";
import Identicon from "identicon.js";
import UpperSocial from "../../../public/UpperSocial.svg";
import Link from "next/link";

interface TrendingCreatorsProps {
  handle: string;
}

export default function TrendingCreators({ handle }: TrendingCreatorsProps) {
  const { data: profile } = useProfile({
    handle: handle,
  });

  return <div>{handle}</div>;
}
