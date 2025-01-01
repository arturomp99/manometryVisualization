import { debounce } from "lodash";
import type { ScaleOrdinal } from "d3";

import { addHover, clip } from "@/app/d3Utils";

import type { DrawDetailsArgs, Size } from "../../sharedTypes";
import { getLineChartScales } from "./getLineChartScales";
import { drawLines } from "./drawLines";
import { drawAxes } from "./drawAxes";
import { LineDataType, MultiLineDataType } from "../sharedTypes";

export type RedrawLinesFunctionType = (
  data: MultiLineDataType,
  hoveredLineId?: string
) => void;

export const drawLineChartDetails = (
  args: DrawDetailsArgs<MultiLineDataType, LineDataType>,
  colorScale: ScaleOrdinal<string, string, never>
):
  | {
      onBrush: (brush: [number, number]) => void;
      redrawLines: RedrawLinesFunctionType;
    }
  | undefined => {
  const { parentRef, data, size, padding, onHover } = args;

  if (!parentRef || !size.height || !size.width) {
    return;
  }

  const scales = {
    ...getLineChartScales(data, size as Size, padding),
    colorScale,
  };
  const { lines, updateLines } = drawLines(parentRef, data, padding, scales);
  if (!!onHover) {
    addHover(parentRef, ".pressure-lines-thicker", onHover);
  }
  const updateAxes = drawAxes(parentRef, scales, size as Size, padding);
  clip(parentRef, [lines], size as Size, padding);

  const onBrush = (brushSelection: [number, number]) => {
    updateAxes(brushSelection);
    updateLines();
  };

  const redrawLines: RedrawLinesFunctionType = (data, hoveredLineId) => {
    const hoveredLine = data.lines.find(
      (line) => line.lineId === hoveredLineId
    );
    const prevHoveredLine = data.lines.find((line) => line.hovered);
    if (hoveredLine) {
      hoveredLine.hovered = true;
    }
    if (prevHoveredLine) {
      prevHoveredLine.hovered = false;
    }

    drawLines(parentRef, data, padding, scales);
  };

  return { onBrush, redrawLines };
};

export const debouncedDrawLineChartDetails = debounce(
  drawLineChartDetails,
  500
);
