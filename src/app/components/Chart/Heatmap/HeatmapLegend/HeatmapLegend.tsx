import { useEffect, type FC } from "react";
import { useResizableRef } from "@/app/hooks";

import type { HeatmapScalesType } from "../drawHeatmap/getHeatmapScales";
import { debouncedDrawHeatmapLegend } from "./drawHeatmapLegend";
import type { OnBrushType } from "../../sharedTypes";

export const HeatmapLegend: FC<{
  colorScale: HeatmapScalesType["colorScale"] | undefined;
  onBrush: OnBrushType;
}> = ({ colorScale, onBrush }) => {
  const { containerRef, size } = useResizableRef<SVGSVGElement>();

  useEffect(() => {
    debouncedDrawHeatmapLegend(containerRef.current, size, colorScale, onBrush);
  }, [size, colorScale, containerRef]);

  return <svg className="w-full h-10" ref={containerRef} />;
};
