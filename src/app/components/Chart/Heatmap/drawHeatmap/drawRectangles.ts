import { BrushSelection, select } from "d3";
import type { Padding } from "../../sharedTypes";
import type { HeatmapScalesType } from "./getHeatmapScales";
import type {
  HeatmapDataType,
  RectangleDataType,
  RowDataType,
} from "../sharedTypes";

export const drawRectangles = (
  parentRef: SVGSVGElement,
  data: HeatmapDataType,
  padding: Padding,
  scales: HeatmapScalesType
): {
  rectangles: SVGElement | null;
  updateRectangles: (highlighRange?: [number, number] | null) => void;
  highlightRectangles: (highlighRange: [number, number] | null) => void;
} => {
  const rowsGroup = select(parentRef)
    .data([0])
    .append("g")
    .attr("transform", `translate(${padding.x.left}, ${padding.y.top})`);
  const rows = rowsGroup
    .selectAll<SVGGElement, RowDataType>(".sensor-group")
    .data(data.rows, (dataRow) => dataRow.rowId)
    .join("g")
    .attr("class", "sensor-group")
    .attr(
      "transform",
      (dataRow) => `translate(0,${scales.yScale(dataRow.rowId)})`
    );

  const rectangles = rows
    .selectAll<SVGRectElement, RectangleDataType[]>(".rect-marker")
    .data((dataRow) => dataRow.rectangles)
    .join("rect")
    .attr("class", "rect-marker")
    .attr("x", (rectData) => scales.xScale(rectData.timestampInitial))
    .attr(
      "width",
      (rectData) =>
        scales.xScale(rectData.timestampFinal) -
        scales.xScale(rectData.timestampInitial)
    )
    .attr("height", scales.yScale.bandwidth())
    .attr("fill", (rectData) => scales.colorScale(rectData.pressure));

  const updateRectangles = (highlighRange?: BrushSelection | null) => {
    rectangles
      .attr("x", (rectData) => scales.xScale(rectData.timestampInitial))
      .attr(
        "width",
        (rectData) =>
          scales.xScale(rectData.timestampFinal) -
          scales.xScale(rectData.timestampInitial)
      )
      .attr("fill-opacity", (rectData) =>
        !!highlighRange
          ? rectData.pressure >= (highlighRange[0] as number) &&
            rectData.pressure <= (highlighRange[1] as number)
            ? 1
            : 0.2
          : 1
      );
  };

  const highlightRectangles = (highlighRange: [number, number] | null) => {
    rectangles.attr("fill-opacity", (rectData) =>
      !!highlighRange
        ? rectData.pressure >= highlighRange[0] &&
          rectData.pressure <= highlighRange[1]
          ? 1
          : 0.2
        : 1
    );
  };

  return {
    rectangles: rowsGroup.node(),
    updateRectangles,
    highlightRectangles,
  };
};
