import { brushX, select } from "d3";
import type { D3BrushEvent } from "d3";
import { OnBrushType, Padding, Size } from "../components/Chart/sharedTypes";

export const addBrush = (
  svgRef: SVGSVGElement,
  size: Size,
  padding: Padding,
  onBrush: OnBrushType,
  onBrushEnd: () => void
) => {
  const defaultSelection: [number, number] = [0, 0];
  const brushExtent: [[number, number], [number, number]] = [
    [padding.x.left, padding.y.top],
    [size.width - padding.x.right, size.height - padding.y.bottom],
  ];
  const brush = brushX()
    .extent(brushExtent)
    .on("brush", (brushEvent: D3BrushEvent<unknown>) =>
      onBrush(brushEvent?.selection)
    )
    .on("end", onBrushEnd);

  select(svgRef).append("g").call(brush).call(brush.move, defaultSelection);
};
