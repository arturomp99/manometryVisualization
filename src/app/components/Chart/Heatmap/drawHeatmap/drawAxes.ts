import { axisBottom, axisLeft, select } from "d3";
import type { Padding, Size } from "../../sharedTypes";
import type { HeatmapScalesType } from "./getHeatmapScales";

export const drawAxes = (
  parentRef: SVGSVGElement,
  scales: HeatmapScalesType,
  dimensions: Size,
  padding: Padding
): ((newXAxisExtent: [number, number]) => {
  newScales: HeatmapScalesType;
}) => {
  const { xScale, yScale, colorScale } = scales;
  const initialDomain = xScale.domain();

  const xAxis = axisBottom(xScale);
  const yAxis = axisLeft(yScale);

  const xAxisG = select(parentRef)
    .selectAll(".heatmap-x-axis")
    .data([0])
    .enter()
    .append("g")
    .attr("class", "line-chart-x-axis")
    .call(xAxis)
    .attr(
      "transform",
      `translate(${padding.x.left},${dimensions.height - padding.y.bottom})`
    );

  select(parentRef)
    .selectAll(".line-chart-y-axis")
    .data([0])
    .enter()
    .append("g")
    .attr("class", "line-chart-y-axis")
    .call(yAxis)
    .attr("transform", `translate(${padding.x.left}, ${padding.y.top})`);

  const updateAxes = (
    newXAxisExtent: [number, number] | null
  ): { newScales: HeatmapScalesType } => {
    const newXScale = xScale?.domain(newXAxisExtent ?? initialDomain);
    xAxisG.call(axisBottom(newXScale));
    return { newScales: { xScale: newXScale, yScale, colorScale } };
  };

  return updateAxes;
};
