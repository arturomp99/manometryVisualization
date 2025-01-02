import { debounce } from "lodash";
import { axisBottom, range, scaleLinear, select } from "d3";
import type { HeatmapScalesType } from "../drawHeatmap/getHeatmapScales";
import type { Padding, PartialSize } from "../../sharedTypes";

const padding: Padding = {
  x: { left: 16, right: 16 },
  y: { top: 0, bottom: 16 },
};

const drawHeatmapLegend = (
  parentRef: SVGSVGElement | null,
  size: PartialSize,
  colorScale: HeatmapScalesType["colorScale"] | undefined
) => {
  if (!parentRef || !size.height || !size.width || !colorScale) {
    return;
  }

  const colorRange = colorScale.domain();
  const numColorPoints = 20;
  const colorPoints = range(
    colorRange[0],
    colorRange[1],
    (colorRange[1] - colorRange[0]) / (numColorPoints - 1)
  ).concat(colorRange[1]);
  const sampledColors = colorPoints.map((colorPoint) => colorScale(colorPoint));

  const defs = select(parentRef).selectAll("defs").data([0]).join("defs");
  const gradient = defs
    .selectAll("linearGradient")
    .data([0])
    .join("linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "0%");
  gradient
    .selectAll("stop")
    .data(sampledColors)
    .join("stop")
    .attr("offset", (_, index) => `${(index / sampledColors.length) * 100}%`)
    .style("stop-color", (colorData) => colorData);

  select(parentRef)
    .selectAll("rect")
    .data([0])
    .join("rect")
    .attr("height", size.height - padding.y.bottom - padding.y.top)
    .attr("width", size.width - padding.x.left - padding.x.right)
    .attr("transform", `translate(${padding.x.left}, ${padding.y.top})`)
    .attr("fill", "url(#gradient)");

  const colorAxis = axisBottom<number>(
    scaleLinear()
      .domain(colorScale.domain())
      .range([0, size.width - padding.x.left - padding.x.right])
  );
  select(parentRef)
    .selectAll<SVGGElement, never>(".color-scale-axis")
    .data([0])
    .join("g")
    .attr("class", "color-scale-axis")
    .call(colorAxis)
    .attr(
      "transform",
      `translate(${padding.x.left},${size.height - padding.y.bottom})`
    );
};

export const debouncedDrawHeatmapLegend = debounce(drawHeatmapLegend, 500);
