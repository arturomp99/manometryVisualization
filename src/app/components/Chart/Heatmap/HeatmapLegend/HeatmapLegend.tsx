import { useEffect, type FC } from "react";
import type { ScaleSequential } from "d3";
import { useResizableRef } from "@/app/hooks";

import { HeatmapScalesType } from "../drawHeatmap/getHeatmapScales";
import { debouncedDrawHeatmapLegend } from "./drawHeatmapLegend";

export const HeatmapLegend: FC<{
  colorScale: HeatmapScalesType["colorScale"] | undefined;
}> = ({ colorScale }) => {
  const { containerRef, size } = useResizableRef<SVGSVGElement>();

  useEffect(() => {
    debouncedDrawHeatmapLegend(containerRef.current, size, colorScale);
  }, [size, colorScale]);

  return <svg className="w-full h-10" ref={containerRef} />;
};
