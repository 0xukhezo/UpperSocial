import SideBar from "@/components/Layout/SideBar";
import Notification from "@/components/Sections/Notification";
import { useProfile } from "@lens-protocol/react-web";
import React from "react";

export default function Notifications() {
  const { data: profile } = useProfile({ handle: "christina.lens" });

  return (
    <div>
      {profile && (
        <SideBar
          page={<Notification profileId={profile.id} />}
          isChat={true}
          isProfile={true}
        />
      )}
    </div>
  );
}
