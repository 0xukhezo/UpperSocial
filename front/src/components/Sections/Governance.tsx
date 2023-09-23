import React, { useEffect, useState } from "react";
import GovernanceCard from "../Cards/GovernanceCard";
import ProposalForm from "../Forms/ProposalForm";
import GovernanceFeed from "../Feeds/GovernanceFeed";

const governanceProposals = [
  {
    title: "Puppies in Bali",
    overview:
      "We're seeking your support to create a heartwarming video featuring adorable puppies in Bali in collaboration with a renowned influencer. We need to borrow 10,000 Matics to make this dream project a reality, and we're excited to share the details with you.",
    summary:
      "We're seeking your support to create a heartwarming video featuring adorable puppies in Bali in collaboration with a renowned influencer. We need to borrow 10,000 Matics to make this dream project a reality, and we're excited to share the details with you.",
    requirements:
      "We're seeking your support to create a heartwarming video featuring adorable puppies in Bali in collaboration with a renowned influencer. We need to borrow 10,000 Matics to make this dream project a reality, and we're excited to share the details with you.",
    yes: 400,
    no: 100,
  },
  {
    title: "Puppies in Andorra",
    overview:
      "We're seeking your support to create a heartwarming video featuring adorable puppies in Bali in collaboration with a renowned influencer. We need to borrow 10,000 Matics to make this dream project a reality, and we're excited to share the details with you.",
    summary:
      "We're seeking your support to create a heartwarming video featuring adorable puppies in Bali in collaboration with a renowned influencer. We need to borrow 10,000 Matics to make this dream project a reality, and we're excited to share the details with you.",
    requirements:
      "We're seeking your support to create a heartwarming video featuring adorable puppies in Bali in collaboration with a renowned influencer. We need to borrow 10,000 Matics to make this dream project a reality, and we're excited to share the details with you.",
    yes: 100,
    no: 101,
  },
];

export default function Governance() {
  const [proposalSelected, setProposalSelected] = useState<any>(null);
  const [modeCreate, setModeCreate] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(1000);

  const displayHeight = () => {
    const htmlElementHeight = document.documentElement.clientHeight;
    const height = htmlElementHeight - 64;

    setHeight(height);
  };

  const selectProposal = (proposal: any) => {
    setProposalSelected(proposal);
    setModeCreate(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", displayHeight);
    window.addEventListener("resize", displayHeight);
    displayHeight();
  }, []);

  return (
    <div className="flex flex-row feed">
      <section className="min-w-[400px] border-r-1 ">
        <div className="flex justify-between py-[12px] px-[24px] items-center">
          <h1>Proposals</h1>
          <button
            className="px-[17px] py-[9px] bg-indigo-400 border-1 border-indigo-600 text-white rounded-lg"
            onClick={() => setModeCreate(true)}
          >
            New
          </button>
        </div>

        <div className="flex justify-between gap-x-[24px] px-[24px] mb-[16px] mt-[26px] font-medium text-sm">
          <button>All</button> <button>New</button> <button>Won</button>{" "}
          <button>Losed</button>
        </div>
        <div className="flex flex-col">
          {governanceProposals.map((proposal: any) => {
            return (
              <button
                onClick={() => selectProposal(proposal)}
                key={proposal.title}
              >
                <GovernanceCard
                  proposal={proposal}
                  proposalSelected={proposalSelected}
                />
              </button>
            );
          })}
        </div>
      </section>
      {modeCreate ? (
        <section className="w-full relative" style={{ height: `${height}px` }}>
          <ProposalForm />
        </section>
      ) : (
        proposalSelected && (
          <section
            className="w-full relative"
            style={{ height: `${height}px` }}
          >
            <GovernanceFeed proposalSelected={proposalSelected} />
          </section>
        )
      )}
    </div>
  );
}
