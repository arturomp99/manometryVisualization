import { select } from "d3";
import { Padding, Size } from "../components/Chart/sharedTypes";

export const clip = (
  parentRef: SVGSVGElement,
  elements: [SVGElement | null],
  size: Size,
  padding: Padding
) => {
  if (!elements) {
    return;
  }

  const clipId = `clip${Math.floor(Math.random() * 1e9)}`;

  select(parentRef)
    .append("clipPath")
    .attr("id", clipId)
    .append("rect")
    .attr("x", padding.x.left)
    .attr("y", padding.y.top)
    .attr("height", size.height - padding.y.top - padding.y.bottom)
    .attr("width", size.width - padding.x.left - padding.x.right);

  elements.forEach((element) => {
    select(element).attr("clip-path", clipId);
  });

  return;
};
