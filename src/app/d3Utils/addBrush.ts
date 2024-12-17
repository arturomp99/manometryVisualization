import { brushX, select } from "d3";
import type { D3BrushEvent } from "d3";
import { OnBrushType, Padding, Size } from "../components/Chart/sharedTypes";
import { getLineChartScales } from "../components/Chart/LineChart/drawLineChart/getLineChartScales";

export const addBrush = (
  svgRef: SVGSVGElement,
  xScale: ReturnType<typeof getLineChartScales>["xScale"],
  size: Size,
  padding: Padding,
  onBrush: OnBrushType
) => {
  const brushExtent: [[number, number], [number, number]] = [
    [padding.x.left, padding.y.top],
    [size.width - padding.x.right, size.height - padding.y.bottom],
  ];
  const brush = brushX()
    .extent(brushExtent)
    .on("brush", (brushEvent: D3BrushEvent<unknown>) => {
      const brushSelection = brushEvent?.selection;
      if (!brushSelection) {
        return;
      }
      const brushExtent: [number, number] = [
        xScale.invert(brushSelection[0] as number),
        xScale.invert(brushSelection[1] as number),
      ];
      onBrush(brushExtent);
    })
    .on("end", (brushEvent: D3BrushEvent<unknown>) => {
      if (brushEvent.selection === null) {
        onBrush(null);
      }
    });

  select(svgRef).append("g").call(brush);
};
