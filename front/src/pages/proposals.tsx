import SideBar from "@/components/Layout/SideBar";
import Governance from "@/components/Sections/Governance";
import React from "react";

export default function Proposals() {
  return (
    <div>
      <SideBar page={<Governance />} isChat={true} isProfile={true} />
    </div>
  );
}
