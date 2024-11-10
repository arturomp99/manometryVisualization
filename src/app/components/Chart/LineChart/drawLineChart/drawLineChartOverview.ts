import { debounce } from "lodash";
import type { Padding, PartialSize, Size } from "../../sharedTypes";
import type { MultiLineDataType } from "../sharedTypes";
import { drawAxes } from "./drawAxes";
import { getLineChartScales } from "./getLineChartScales";
import { mapToPx } from "./mapToPx";
import { drawLines } from "./drawLines";
import { addBrush } from "@/app/d3Utils/addBrush";

export const drawLineChartOverview = (
  parentRef: SVGSVGElement | null,
  data: MultiLineDataType,
  size: PartialSize,
  padding: Padding
) => {
  if (!parentRef || !size.height || !size.width) {
    return;
  }
  const scales = getLineChartScales(data, size as Size, padding);
  const mappedData = mapToPx(data, scales);
  drawLines(parentRef, mappedData, padding);
  addBrush(
    parentRef,
    size as Size,
    padding,
    (brush) => console.log("arturo brushed", brush),
    () => console.log("arturo brush end")
  );
  drawAxes(parentRef, scales, size as Size, padding);
};

export const debouncedDrawLineChartOverview = debounce(
  drawLineChartOverview,
  500
);
