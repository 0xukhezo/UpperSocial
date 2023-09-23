// Next
import Link from "next/link";
// React
import React from "react";

interface LinkProfileProps {
  handle: string;
  owner: string | null | undefined;
}

export default function LinkProfile({ handle, owner }: LinkProfileProps) {
  return <Link href={`/profiles/${handle}`}>{owner ? owner : handle}</Link>;
}
