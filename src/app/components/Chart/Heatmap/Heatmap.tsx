import { FC, useMemo, useState } from "react";
import { BrushSelection } from "d3";
import { ChartSettings } from "../ChartSettings/ChartSettings";
import { ChartProps, OnBrushType } from "../sharedTypes";
import { Spacer } from "@nextui-org/spacer";
import { HeatmapOverview } from "./HeatmapOverview";
import { HeatmapDetails } from "./HeatmapDetails";
import { mapToHeatmapData } from "./mapToHeatmapData";

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
      {!!heatmapData ? (
        <HeatmapOverview data={heatmapData} onBrush={onBrush} />
      ) : null}
      <Spacer y={2} />
      {!!heatmapData ? (
        <HeatmapDetails data={heatmapData} brush={brushSelection} addLegend />
      ) : null}
    </>
  );
};
