import { debounce } from "lodash";
import { addBrush } from "@/app/d3Utils/addBrush";
import { DrawOverviewArgs, Size } from "../../sharedTypes";
import { getHeatmapScales } from "./getHeatmapScales";
import { drawAxes } from "./drawAxes";
import { drawRectangles } from "./drawRectangles";
import { HeatmapDataType } from "../sharedTypes";

export const drawHeatmapOverview = (
  args: DrawOverviewArgs<HeatmapDataType>
) => {
  const { parentRef, data, size, padding, onBrush } = args;

  if (!parentRef || !size.height || !size.width) {
    return;
  }

  const scales = getHeatmapScales(data, size as Size, padding);
  drawRectangles(parentRef, data, padding, scales);
  addBrush(parentRef, scales.xScale, size as Size, padding, onBrush);
  drawAxes(parentRef, scales, size as Size, padding);
};

export const debouncedDrawHeatmapOverview = debounce(drawHeatmapOverview, 500);
