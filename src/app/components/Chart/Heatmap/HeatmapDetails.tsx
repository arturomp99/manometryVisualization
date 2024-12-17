import type { FC } from "react";
import type { DetailChartProps } from "../sharedTypes";
import type { HeatmapDataType } from "./sharedTypes";

interface HeatmapDetailsProps extends DetailChartProps {
  data: HeatmapDataType;
}

export const HeatmapDetails: FC<HeatmapDetailsProps> = () => {
  return <h1>HEATMAP DETAILS</h1>;
};
