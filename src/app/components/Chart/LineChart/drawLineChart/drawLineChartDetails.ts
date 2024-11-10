import { debounce } from "lodash";
import type { MultiLineDataType } from "../sharedTypes";
import type { Padding, PartialSize, Size } from "../../sharedTypes";
import { getLineChartScales } from "./getLineChartScales";
import { drawLines } from "./drawLines";
import { drawAxes } from "./drawAxes";
import { clip } from "@/app/d3Utils";
import { BrushSelection } from "d3";

export const drawLineChartDetails = (
  parentRef: SVGSVGElement | null,
  data: MultiLineDataType,
  size: PartialSize,
  padding: Padding
): { onBrush: (brush: [number, number]) => void } | undefined => {
  if (!parentRef || !size.height || !size.width) {
    return;
  }
  const scales = getLineChartScales(data, size as Size, padding);
  const { lines, updateLines } = drawLines(parentRef, data, padding, scales);
  const updateAxes = drawAxes(parentRef, scales, size as Size, padding);
  clip(parentRef, [lines], size as Size, padding);

  const onBrush = (brushSelection: [number, number]) => {
    const { newScales } = updateAxes(brushSelection);
    updateLines(newScales);
  };

  return { onBrush };
};

export const debouncedDrawLineChartDetails = debounce(
  drawLineChartDetails,
  500
);
