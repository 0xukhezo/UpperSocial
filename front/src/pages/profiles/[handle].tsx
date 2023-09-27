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
  console.log(data);
  return (
    <div>
      <SideBar
        page={
          <Profile
            handle={router.query.handle}
            // isMyProfile={data[0].handle === router.query.handle}
            // Mock
            isMyProfile={"1695481341214.test" === router.query.handle}
            myProfile={data}
          />
        }
        isProfile={true}
      />
    </div>
  );
}
