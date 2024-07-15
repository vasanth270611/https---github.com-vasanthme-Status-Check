import { PieChart } from "@mui/x-charts";
import React from "react";

export default function AvalibilityPieChart({ avalibalityList }) {
  let data =
    avalibalityList?.map((item, index) => {
      return {
        id: index,
        value: item.availability_percentage,
        label: item.app,
      };
    }) || [];
  return (
    <div>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.value}%`,
            data: data,
          },
        ]}
        width={400}
        height={450}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "left" },
          },
        }}
      />
    </div>
  );
}
