import SideBar from "@/components/Layout/SideBar";
import Marketplace from "@/components/Sections/Marketplace";
import React from "react";

export default function Purchases() {
  return (
    <div>
      <SideBar page={<Marketplace />} isChat={true} isProfile={true} />
    </div>
  );
}
