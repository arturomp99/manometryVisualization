import { extent, scaleLinear } from "d3";
import type { ScaleLinear, ScaleOrdinal } from "d3";
import type { Padding, Size } from "../../sharedTypes";
import type { MultiLineDataType } from "../sharedTypes";

export type LineChartScalesType = {
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
  colorScale: ScaleOrdinal<string, string, never>;
};

export const getLineChartScales = (
  data: MultiLineDataType,
  dimensions: Size,
  padding: Padding
): Pick<LineChartScalesType, "xScale" | "yScale"> => {
  const xExtent = extent(
    data.lines.flatMap((line) => line.points.map((point) => point.x))
  ) as [number, number];
  const yExtent = extent(
    data.lines.flatMap((line) => line.points.map((point) => point.y))
  ).reverse() as [number, number];

  const xScale = scaleLinear().domain(xExtent);
  const yScale = scaleLinear().domain(yExtent);

  xScale.range([0, dimensions.width - padding.x.left - padding.x.right]);
  yScale.range([0, dimensions.height - padding.y.top - padding.y.bottom]);

  return { xScale, yScale };
};
