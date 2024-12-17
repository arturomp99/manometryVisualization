import { debounce } from "lodash";
import type { DrawDetailsArgs, Size } from "../../sharedTypes";
import { getLineChartScales } from "./getLineChartScales";
import { drawLines } from "./drawLines";
import { drawAxes } from "./drawAxes";
import { clip } from "@/app/d3Utils";
import { MultiLineDataType } from "../sharedTypes";

export const drawLineChartDetails = (
  args: DrawDetailsArgs<MultiLineDataType>
): { onBrush: (brush: [number, number]) => void } | undefined => {
  const { parentRef, data, size, padding } = args;

  if (!parentRef || !size.height || !size.width) {
    return;
  }

  const scales = getLineChartScales(data, size as Size, padding);
  const { lines, updateLines } = drawLines(parentRef, data, padding, scales);
  const updateAxes = drawAxes(parentRef, scales, size as Size, padding);
  clip(parentRef, [lines], size as Size, padding);

  const onBrush = (brushSelection: [number, number]) => {
    updateAxes(brushSelection);
    updateLines();
  };

  return { onBrush };
};

export const debouncedDrawLineChartDetails = debounce(
  drawLineChartDetails,
  500
);
