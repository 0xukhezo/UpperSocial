// React
import React, { useState } from "react";

export default function ProposalForm() {
  const [title, setTitle] = useState<string>("");
  const [overview, setOverview] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [requirements, setRequirements] = useState<string>("");

  const handleText = (type: string, value: any) => {
    switch (type) {
      case "title":
        setTitle(value);
        break;
      case "overview":
        setOverview(value);
        break;
      case "summary":
        setSummary(value);
        break;
      case "requirements":
        setRequirements(value);
        break;
      default:
        break;
    }
  };
  return (
    <div className="flex flex-col px-[50px] py-[80px]">
      <h1 className="font-semibold text-lg">New Proposal</h1>
      <div className="font-light text-gray-500 mt-3">
        This information will be displayed publicly so be careful what you
        share.
      </div>
      <div className="mt-[38px]">
        <div className="grid grid-cols-4">
          <span>Proposal Name</span>
          <input
            value={title}
            onChange={(e: any) => handleText("title", e.target.value)}
            className="border-1 p-[10px] text-gray-900 rounded-md w-1/2 col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 my-[38px]">
          <span>Overview</span>
          <div className="flex flex-col  col-span-3">
            <textarea
              value={overview}
              onChange={(e: any) => handleText("overview", e.target.value)}
              className="border-1 p-[10px] text-gray-900 rounded-md w-3/4 min-h-[100px]"
            />
            <span className="text-sm text-gray-500 mt-3">
              Write a few sentences about the overview.
            </span>
          </div>
        </div>
        <div className="grid grid-cols-4 mb-[38px]">
          <span>Summary</span>
          <div className="flex flex-col  col-span-3">
            <textarea
              value={summary}
              onChange={(e: any) => handleText("summary", e.target.value)}
              className="border-1 p-[10px] text-gray-900 rounded-md w-3/4 min-h-[100px]"
            />
            <span className="text-sm text-gray-500 mt-3">
              Write a few sentences about summary's project.
            </span>
          </div>
        </div>
        <div className="grid grid-cols-4">
          <span>Requirements</span>
          <div className="flex flex-col  col-span-3">
            <textarea
              value={requirements}
              onChange={(e: any) => handleText("requirements", e.target.value)}
              className="border-1 p-[10px] text-gray-900 rounded-md w-3/4 min-h-[100px]"
            />
            <span className="text-sm text-gray-500 mt-3">
              Write a few sentences about requirements.
            </span>
          </div>
        </div>
      </div>
      <button className="bg-indigo-700 rounded-lg font-medium text-white tracking-wide text-sm py-[9px] px-[48px] mt-[40px] mx-auto">
        <span>Create</span>
      </button>
    </div>
  );
}
