import { useState, useMemo } from "react";
import { debounce } from "lodash";
import { HeatmapScalesType } from "../drawHeatmap/getHeatmapScales";
import { OnBrushType } from "../../sharedTypes";

export const useLegendBrush = (
  colorScale: HeatmapScalesType["colorScale"] | undefined
) => {
  const [legendBrush, setLegendBrush] =
    useState<NonNullable<typeof colorScale>["range"]>();

  const onLegendBrush: OnBrushType = useMemo(
    () =>
      debounce((brush) => {
        setLegendBrush(brush);
      }, 100),
    [colorScale]
  );

  return { legendBrush, onLegendBrush };
};
