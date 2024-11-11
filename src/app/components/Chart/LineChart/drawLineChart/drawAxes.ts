import { axisBottom, axisLeft, BrushSelection, select } from "d3";
import { Padding, Size } from "../../sharedTypes";
import { getLineChartScales } from "./getLineChartScales";

export const drawAxes = (
  parentRef: SVGSVGElement,
  scales: ReturnType<typeof getLineChartScales>,
  dimensions: Size,
  padding: Padding
): ((newXAxisExtent: [number, number]) => {
  newScales: ReturnType<typeof getLineChartScales>;
}) => {
  const { xScale, yScale } = scales;
  const initialDomain = xScale.domain();

  const xAxis = axisBottom(xScale);
  const yAxis = axisLeft(yScale);

  const xAxisG = select(parentRef)
    .selectAll(".line-chart-x-axis")
    .data([0])
    .enter()
    .append("g")
    .attr("class", "line-chart-x-axis")
    .call(xAxis)
    .attr(
      "transform",
      `translate(${padding.x.left},${yScale(0) + padding.y.top})`
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
  ): { newScales: ReturnType<typeof getLineChartScales> } => {
    const newXScale = xScale?.domain(newXAxisExtent ?? initialDomain);
    xAxisG.call(axisBottom(newXScale));
    return { newScales: { xScale: newXScale, yScale } };
  };

  return updateAxes;
};
