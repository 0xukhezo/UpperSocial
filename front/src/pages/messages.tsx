// Components
import Chat from "@/components/Sections/Chat";
import SideBar from "@/components/Layout/SideBar";
// React
import React from "react";

export default function Messages() {
  return (
    <div>
      <SideBar page={<Chat />} isChat={true} isProfile={true} />
    </div>
  );
}
