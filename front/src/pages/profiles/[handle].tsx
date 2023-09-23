// Components
import SideBar from "@/components/Layout/SideBar";
import Profile from "@/components/Sections/Profile";
// Lens
import { useActiveProfile } from "@lens-protocol/react-web";
// Next
import { useRouter } from "next/router";
// React
import React from "react";

export default function PorfileHandle() {
  const router = useRouter();
  const { data } = useActiveProfile();

  return (
    <div>
      <SideBar
        page={
          <Profile
            handle={router.query.handle}
            isMyProfile={data?.handle === router.query.handle}
            myProfile={data}
          />
        }
        isProfile={true}
      />
    </div>
  );
}
