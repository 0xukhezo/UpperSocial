// React
import React from "react";
// Lens
import { ProfileId, useFeed } from "@lens-protocol/react-web";
// Components
import PostCard from "../Cards/PostCard";
import Loader from "../Loader/Loader";

interface InfiniteFeedProps {
  profileId: ProfileId;
}

export default function InfiniteFeed({ profileId }: InfiniteFeedProps) {
  const { data: feedItems, loading } = useFeed({
    profileId: profileId,
    limit: 40,
  });

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        feedItems?.map((item: any, index: number) => {
          return (
            <PostCard
              image={item.root.metadata.image}
              profileImage={
                item.root.profile.picture &&
                "original" in item.root.profile.picture &&
                (item.root.profile.picture.original.url as string)
              }
              owner={item.root.profile.name}
              profile={item.root.profile.handle}
              description={item.root.metadata.content}
              likes={item.root.stats.totalAmountOfMirrors}
              key={index}
            />
          );
        })
      )}
    </div>
  );
}
