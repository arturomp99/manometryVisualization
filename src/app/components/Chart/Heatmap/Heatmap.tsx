import { FC } from "react";
import { ChartSettings } from "../ChartSettings/ChartSettings";
import { Legend } from "../Legend";
import { ChartProps } from "../sharedTypes";
import { Spacer } from "@nextui-org/spacer";
import { OverviewContainer } from "../../Containers/OverviewContainer";
import { HeatmapOverview } from "./HeatmapOverview";
import { DetailsContainer } from "../../Containers/DetailsContainer";
import { HeatmapDetails } from "./HeatmapDetails";

export const Heatmap: FC<ChartProps> = ({ data }) => {
  return (
    <>
      <ChartSettings />
      <Spacer y={2} />
      <OverviewContainer>
        <HeatmapOverview />
      </OverviewContainer>
      <Spacer y={2} />
      <DetailsContainer>
        <HeatmapDetails />
      </DetailsContainer>
      <Spacer y={2} />
      <Legend />
    </>
  );
};
