import { select, line } from "d3";
import { LineDataType, MultiLineDataType, PointDataType } from "../sharedTypes";
import type { Padding } from "../../sharedTypes";

export const drawLines = (
  parentRef: SVGSVGElement,
  data: MultiLineDataType,
  padding: Padding
) => {
  const lineGenerator = line<PointDataType>()
    .x((point) => point.x)
    .y((point) => point.y);

  const lines = select(parentRef)
    .selectAll<SVGPathElement, LineDataType>(".pressure-lines")
    .data(data.lines, (dataLine) => dataLine.lineId);
  lines
    .enter()
    .append("path")
    .attr("d", (dataLine) => lineGenerator(dataLine.points))
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1)
    .attr("transform", `translate(${padding.x.left}, ${padding.y.top})`);

  console.log("arturo data", lines.data);
};
