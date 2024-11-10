import { select } from "d3";
import { Padding, Size } from "../components/Chart/sharedTypes";

export const clip = (svgRef: SVGSVGElement, size: Size, padding: Padding) => {
  const clipId = DOM.uid("clip");
  select(svgRef).append("clipPath").attr("id", clip);

  return;
};
