import { debounce } from "lodash";
import type { DrawOverviewArgs, Size } from "../../sharedTypes";
import { drawAxes } from "./drawAxes";
import { getLineChartScales } from "./getLineChartScales";
import { drawLines } from "./drawLines";
import { addBrush } from "@/app/d3Utils/addBrush";
import { MultiLineDataType } from "../sharedTypes";

export const drawLineChartOverview = (
  args: DrawOverviewArgs<MultiLineDataType>
) => {
  const { parentRef, data, size, padding, onBrush } = args;
  if (!parentRef || !size.height || !size.width) {
    return;
  }

  const scales = getLineChartScales(data, size as Size, padding);
  drawLines(parentRef, data, padding, scales);
  addBrush(parentRef, scales.xScale, size as Size, padding, onBrush);
  drawAxes(parentRef, scales, size as Size, padding);
};

export const debouncedDrawLineChartOverview = debounce(
  drawLineChartOverview,
  500
);
