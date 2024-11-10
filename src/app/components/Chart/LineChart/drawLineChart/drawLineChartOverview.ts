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
import { BrushSelection } from "d3";

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
  addBrush(
    parentRef,
    size as Size,
    padding,
    (brush: BrushSelection | null) => {
      if (!brush) {
        return;
      }
      const brushSelection: [number, number] = [
        scales.xScale.invert(brush[0] as number),
        scales.xScale.invert(brush[1] as number),
      ];
      onBrush(brushSelection);
    },
    () => console.log("arturo brush end")
  );
  drawAxes(parentRef, scales, size as Size, padding);
};

export const debouncedDrawLineChartOverview = debounce(
  drawLineChartOverview,
  500
);
