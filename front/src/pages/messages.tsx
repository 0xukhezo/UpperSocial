import Chat from "@/components/Sections/Chat";
import React from "react";
import SideBar from "../components/Layout/SideBar";

export default function Messages() {
  return (
    <div>
      <SideBar page={<Chat />} isChat={true} isProfile={true} />
    </div>
  );
}
