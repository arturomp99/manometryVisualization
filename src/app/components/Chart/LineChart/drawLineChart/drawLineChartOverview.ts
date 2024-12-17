import { debounce } from "lodash";
import type {
  OnBrushType,
  Padding,
  PartialSize,
  Size,
} from "../../sharedTypes";
import type { MultiLineDataType } from "../sharedTypes";
import { drawAxes } from "./drawAxes";
import { getLineChartScales } from "./getLineChartScales";
import { drawLines } from "./drawLines";
import { addBrush } from "@/app/d3Utils/addBrush";

export const drawLineChartOverview = (
  parentRef: SVGSVGElement | null,
  data: MultiLineDataType,
  size: PartialSize,
  padding: Padding,
  onBrush: OnBrushType
) => {
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
