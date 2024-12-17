import {
  extent,
  interpolateTurbo,
  scaleBand,
  scaleLinear,
  scaleSequential,
} from "d3";
import type { ScaleBand, ScaleSequential } from "d3";
import { Padding, Size } from "../../sharedTypes";
import { HeatmapDataType } from "../sharedTypes";

export type HeatmapScalesType = {
  xScale: d3.ScaleLinear<number, number, never>;
  yScale: ScaleBand<string>;
  colorScale: ScaleSequential<string, never>;
};

export const getHeatmapScales = (
  data: HeatmapDataType,
  dimensions: Size,
  padding: Padding
): HeatmapScalesType => {
  const xExtent = extent(
    data.rows.flatMap((row) =>
      row.rectangles.map((point) => point.timestampInitial)
    )
  ) as [number, number];
  const yValues = data.rows.map((row) => row.rowId);
  const colorExtent = extent(
    data.rows.flatMap((row) => row.rectangles.map((point) => point.pressure))
  ) || [0, 0];

  const xScale = scaleLinear().domain(xExtent);
  const yScale = scaleBand().domain(yValues).round(true);
  const colorScale = scaleSequential()
    .domain(colorExtent as [number, number])
    .interpolator(interpolateTurbo);

  xScale.range([0, dimensions.width - padding.x.left - padding.x.right]);
  yScale.range([0, dimensions.height - padding.y.top - padding.y.bottom]);

  return { xScale, yScale, colorScale };
};
