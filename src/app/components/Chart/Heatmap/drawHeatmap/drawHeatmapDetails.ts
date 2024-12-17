import { debounce } from "lodash";
import { clip } from "@/app/d3Utils";
import type { DrawDetailsArgs, Size } from "../../sharedTypes";
import type { HeatmapDataType } from "../sharedTypes";
import { drawAxes } from "./drawAxes";
import { drawRectangles } from "./drawRectangles";
import { getHeatmapScales } from "./getHeatmapScales";

export const drawHeatmapDetails = (args: DrawDetailsArgs<HeatmapDataType>) => {
  const { parentRef, data, size, padding } = args;

  if (!parentRef || !size.height || !size.width) {
    return;
  }

  const scales = getHeatmapScales(data, size as Size, padding);
  const { rectangles, updateRectangles } = drawRectangles(
    parentRef,
    data,
    padding,
    scales
  );
  const updateAxes = drawAxes(parentRef, scales, size as Size, padding);
  clip(parentRef, [rectangles], size as Size, padding);

  const onBrush = (brushSelection: [number, number]) => {
    updateAxes(brushSelection);
    updateRectangles();
  };

  return { onBrush };
};

export const debouncedDrawHeatmapDetails = debounce(drawHeatmapDetails, 500);
