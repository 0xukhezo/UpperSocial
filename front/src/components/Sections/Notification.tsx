// Lens
import { ProfileId } from "@lens-protocol/react-web";
// React
import React from "react";

interface NotificationProps {
  profileId: ProfileId;
}

export default function Notification({ profileId }: NotificationProps) {
  return <div className="feed">Notifications</div>;
}
