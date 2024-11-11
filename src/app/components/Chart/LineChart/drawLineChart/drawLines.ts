import { select, line } from "d3";
import { LineDataType, MultiLineDataType, PointDataType } from "../sharedTypes";
import type { Padding } from "../../sharedTypes";
import { getLineChartScales } from "./getLineChartScales";

export const drawLines = (
  parentRef: SVGSVGElement,
  data: MultiLineDataType,
  padding: Padding,
  scales: ReturnType<typeof getLineChartScales>
): {
  lines: SVGElement | null;
  updateLines: () => void;
} => {
  const getLineGenerator = (scales: ReturnType<typeof getLineChartScales>) =>
    line<PointDataType>()
      .x((point) => scales.xScale(point.x))
      .y((point) => scales.yScale(point.y));

  const lineGenerator = getLineGenerator(scales);
  const lineGroup = select(parentRef).data([0]).append("g");
  const lines = lineGroup
    .selectAll<SVGPathElement, LineDataType>(".pressure-lines")
    .data(data.lines, (dataLine) => dataLine.lineId)
    .join("path")
    .attr("d", (dataLine) => lineGenerator(dataLine.points))
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1)
    .attr("transform", `translate(${padding.x.left}, ${padding.y.top})`);

  const updateLines = () => {
    const newLineGenerator = getLineGenerator(scales);
    lines.attr("d", (dataLine) => newLineGenerator(dataLine.points));
  };

  return { lines: lineGroup.node(), updateLines };
};
