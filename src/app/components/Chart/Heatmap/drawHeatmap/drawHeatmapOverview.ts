import { debounce } from "lodash";
import { OnBrushType, Padding, PartialSize, Size } from "../../sharedTypes";
import { HeatmapDataType } from "../sharedTypes";
import { getHeatmapScales } from "./getHeatmapScales";
import { drawAxes } from "./drawAxes";
import { drawRectangles } from "./drawRectangles";

export const drawHeatmapOverview = (
  parentRef: SVGSVGElement | null,
  data: HeatmapDataType,
  size: PartialSize,
  padding: Padding,
  onBrush: OnBrushType
) => {
  if (!parentRef || !size.height || !size.width) {
    return;
  }

  const scales = getHeatmapScales(data, size as Size, padding);
  drawRectangles(parentRef, data, padding, scales);
  drawAxes(parentRef, scales, size as Size, padding);
};

export const debouncedDrawHeatmapOverview = debounce(drawHeatmapOverview, 500);
