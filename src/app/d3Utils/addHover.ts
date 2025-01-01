import { select } from "d3";
import type { BaseType } from "d3";

export const addHover = <DescElement extends BaseType, OldDatum>(
  parentRef: SVGSVGElement,
  selector: string,
  callback: (data: OldDatum | null) => void
) => {
  select(parentRef)
    .selectAll<DescElement, OldDatum>(selector)
    .on("mouseover", (_, dataPoint) => callback(dataPoint))
    .on("mouseout", () => callback(null));
};
