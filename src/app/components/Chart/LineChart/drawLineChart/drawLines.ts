import { select, line } from "d3";
import { LineDataType, MultiLineDataType, PointDataType } from "../sharedTypes";
import type { Padding } from "../../sharedTypes";
import { getLineChartScales } from "./getLineChartScales";
import type { LineChartScalesType } from "./getLineChartScales";

export const drawLines = (
  parentRef: SVGSVGElement,
  data: MultiLineDataType,
  padding: Padding,
  scales: LineChartScalesType
): {
  lines: SVGGElement | null;
  updateLines: () => void;
} => {
  const isAnyHovered = data.lines.some((line) => line.hovered);

  const getLineGenerator = (scales: ReturnType<typeof getLineChartScales>) =>
    line<PointDataType>()
      .x((point) => scales.xScale(point.x))
      .y((point) => scales.yScale(point.y));

  const lineGenerator = getLineGenerator(scales);
  const lineGroup = select(parentRef)
    .selectAll<SVGGElement, number[]>("g.lines-group")
    .data([0])
    .join("g")
    .attr("class", "lines-group");

  lineGroup
    .selectAll<SVGPathElement, LineDataType>(".pressure-lines-thicker")
    .data(data.lines, (dataLine) => dataLine.lineId)
    .join(
      (enter) =>
        enter
          .append("path")
          .attr("class", "pressure-lines-thicker")
          .attr("d", (dataLine) => lineGenerator(dataLine.points))
          .attr("fill", "none")
          .attr("stroke", "transparent")
          .attr("stroke-width", 10)
          .attr("transform", `translate(${padding.x.left}, ${padding.y.top})`),
      (update) => update,
      (exit) => exit.remove()
    );

  const lines = lineGroup
    .selectAll<SVGPathElement, LineDataType>(".pressure-lines")
    .data(data.lines, (dataLine) => dataLine.lineId)
    .join(
      (enter) =>
        enter
          .append("path")
          .attr("class", "pressure-lines")
          .attr("d", (dataLine) => lineGenerator(dataLine.points))
          .attr("fill", "none")
          .attr("stroke", (dataLine) => scales.colorScale(dataLine.lineId))
          .attr("stroke-width", 1)
          .attr("transform", `translate(${padding.x.left}, ${padding.y.top})`),
      (update) =>
        update.attr("opacity", (dataLine) =>
          isAnyHovered ? (dataLine.hovered ? 1 : 0.5) : 1
        ),
      (exit) => exit.remove()
    );

  const updateLines = () => {
    const newLineGenerator = getLineGenerator(scales);
    lines.attr("d", (dataLine) => newLineGenerator(dataLine.points));
  };

  return { lines: lineGroup.node(), updateLines };
};
