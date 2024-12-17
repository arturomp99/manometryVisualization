"use client";

import { Tab, Tabs } from "@nextui-org/tabs";
import { Heatmap } from "./Heatmap/Heatmap";
import { LineChart } from "./LineChart/LineChart";
import { useGetChartData } from "@/app/hooks";

export const Charts = () => {
  const { data } = useGetChartData();

  return (
    <Tabs
      aria-label="select-chart-type"
      radius="none"
      color="primary"
      variant="bordered"
      defaultSelectedKey={"heatmap"}
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
