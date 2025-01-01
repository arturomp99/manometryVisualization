import { debounce } from "lodash";
import type { ScaleOrdinal } from "d3";

import { addBrush } from "@/app/d3Utils/addBrush";

import type { DrawOverviewArgs, Size } from "../../sharedTypes";
import { drawAxes } from "./drawAxes";
import { getLineChartScales } from "./getLineChartScales";
import { drawLines } from "./drawLines";
import { MultiLineDataType } from "../sharedTypes";

export const drawLineChartOverview = (
  args: DrawOverviewArgs<MultiLineDataType>,
  colorScale: ScaleOrdinal<string, string, never>
) => {
  const { parentRef, data, size, padding, onBrush } = args;
  if (!parentRef || !size.height || !size.width) {
    return;
  }

  const scales = {
    ...getLineChartScales(data, size as Size, padding),
    colorScale,
  };
  drawLines(parentRef, data, padding, scales);
  addBrush(parentRef, scales.xScale, size as Size, padding, onBrush);
  drawAxes(parentRef, scales, size as Size, padding);
};

export const debouncedDrawLineChartOverview = debounce(
  drawLineChartOverview,
  500
);
