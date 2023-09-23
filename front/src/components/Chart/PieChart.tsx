import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  noVotes: number;
  yesVotes: number;
}

export default function PieChart({ noVotes, yesVotes }: PieChartProps) {
  const data = {
    datasets: [
      {
        label: "# of Votes",
        data: [noVotes, yesVotes],
        backgroundColor: ["rgb(239 68 68)", "rgb(34 197 94)"],
        borderColor: ["rgb(239 68 68)", "rgb(34 197 94)"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}
