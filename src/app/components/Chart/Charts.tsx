"use client";

import dynamic from "next/dynamic";
import { Tab, Tabs } from "@nextui-org/tabs";

import { useGetChartData } from "@/app/hooks";

const Heatmap = dynamic(() =>
  import("./Heatmap/Heatmap").then((module) => module.Heatmap)
);

const LineChart = dynamic(() =>
  import("./LineChart/LineChart").then((module) => module.LineChart)
);

export const Charts = () => {
  const { data } = useGetChartData();

  return (
    <Tabs
      aria-label="select-chart-type"
      radius="none"
      color="primary"
      variant="bordered"
      defaultSelectedKey={"lineChart"}
    >
      <Tab key="heatmap" title="Heatmap">
        <Heatmap data={data} />
      </Tab>
      <Tab key="lineChart" title="LineChart">
        <LineChart data={data} />
      </Tab>
    </Tabs>
  );
};
