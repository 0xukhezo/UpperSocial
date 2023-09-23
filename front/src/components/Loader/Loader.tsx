// React
import React from "react";
// Next
import Image from "next/image";
// Images
import UpperSocial from "../../../public/UpperSocial.svg";

export default function Loader() {
  return (
    <div className="items-center flex h-screen">
      <Image
        height={91}
        width={256}
        src={UpperSocial.src}
        alt="Loader"
        className="mx-auto "
      />
    </div>
  );
}
