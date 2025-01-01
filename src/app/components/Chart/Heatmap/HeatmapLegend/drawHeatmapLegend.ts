import { debounce } from "lodash";
import { range, select } from "d3";
import type { HeatmapScalesType } from "../drawHeatmap/getHeatmapScales";
import type { PartialSize } from "../../sharedTypes";

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
    .attr("height", size.height)
    .attr("width", size.width)
    .attr("fill", "url(#gradient)");
};

export const debouncedDrawHeatmapLegend = debounce(drawHeatmapLegend, 500);
