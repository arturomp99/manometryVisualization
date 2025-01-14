import { FC, useMemo, useState } from "react";
import { BrushSelection } from "d3";
import { ChartSettings } from "../ChartSettings/ChartSettings";
import { ChartProps, OnBrushType } from "../sharedTypes";
import { Spacer } from "@nextui-org/spacer";
import { OverviewContainer } from "../../Containers/OverviewContainer";
import { HeatmapOverview } from "./HeatmapOverview";
import { DetailsContainer } from "../../Containers/DetailsContainer";
import { HeatmapDetails } from "./HeatmapDetails";
import { mapToHeatmapData } from "./mapToHeatmapData";
import { HeatmapLegend } from "./HeatmapLegend";

export const Heatmap: FC<ChartProps> = ({ data }) => {
  const heatmapData = useMemo(() => mapToHeatmapData(data), [data]);
  const [brushSelection, setBrushSelection] = useState<BrushSelection | null>();
  const onBrush: OnBrushType = (brush) => {
    setBrushSelection(brush);
  };

  return (
    <>
      <ChartSettings />
      <Spacer y={2} />
      <OverviewContainer>
        {!!heatmapData ? (
          <HeatmapOverview data={heatmapData} onBrush={onBrush} />
        ) : null}
      </OverviewContainer>
      <Spacer y={2} />
      <DetailsContainer>
        {!!heatmapData ? (
          <HeatmapDetails data={heatmapData} brush={brushSelection} />
        ) : null}
      </DetailsContainer>
      <Spacer y={2} />
      <HeatmapLegend />
    </>
  );
};
