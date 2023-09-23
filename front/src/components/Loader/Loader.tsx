import React from "react";
import UpperSocial from "../../../public/UpperSocial.svg";
import Image from "next/image";

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
