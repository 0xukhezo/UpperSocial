// React
import React, { useState } from "react";
// Components
import TokensModal from "../Modals/CreatorModal";

interface CreatorCardprops {
  profileAddress: string;
  profileId: string;
}

export default function CreatorCard({
  profileAddress,
  profileId,
}: CreatorCardprops) {
  const [openModal, setOpenModal] = useState(false);

  const getOpenModal = (modalClose: boolean) => {
    setOpenModal(modalClose);
  };

  return (
    <div className="ml-[24px] mt-[26px]">
      <div className="flex flex-col shadow-xl max-w-[448px] px-[20px] py-[24px] rounded-lg">
        <h2 className="mb-[12px] font-semibold text-lg">Become a creator</h2>
        <span>
          Become an Upper Creator, start creating content and get paid for it.
        </span>
        <div className="mt-[24px]">
          <button
            className="bg-indigo-700 rounded-lg font-medium text-white tracking-wide text-sm w-full py-[9px] mt-[20px] flex items-center justify-center"
            onClick={() => setOpenModal(true)}
          >
            <span>Become a Creator</span>
          </button>
        </div>
      </div>
      {openModal && (
        <TokensModal
          getOpenModal={getOpenModal}
          profileId={profileId}
          profileAddress={profileAddress}
        />
      )}
    </div>
  );
}
