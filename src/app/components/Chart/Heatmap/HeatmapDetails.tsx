import { useEffect, useState } from "react";
import type { FC } from "react";
import type { BrushSelection } from "d3";
import { useResizableRef } from "@/app/hooks";
import type { DetailChartProps, Padding } from "../sharedTypes";
import type { HeatmapDataType } from "./sharedTypes";
import { drawHeatmapDetails } from "./drawHeatmap/drawHeatmapDetails";

interface HeatmapDetailsProps extends DetailChartProps {
  data: HeatmapDataType;
}

const padding: Padding = {
  x: { left: 24, right: 0 },
  y: { top: 8, bottom: 16 },
};

export const HeatmapDetails: FC<HeatmapDetailsProps> = ({ data, brush }) => {
  const { containerRef, size } = useResizableRef<SVGSVGElement>();

  const [brushUpdate, setBrushUpdate] =
    useState<(brush: BrushSelection | null) => void>();

  useEffect(() => {
    const onSizeChange = setTimeout(() => {
      const updateHeatmap = drawHeatmapDetails({
        parentRef: containerRef.current,
        data,
        size,
        padding,
      });
      setBrushUpdate(() => updateHeatmap?.onBrush);
    }, 500);

    return () => clearTimeout(onSizeChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  useEffect(() => {
    if (brush === undefined) {
      return;
    }
    brushUpdate?.(brush);
  }, [brush, brushUpdate]);

  return (
    <div className="w-full h-full">
      <svg className="w-full h-full" ref={containerRef} />
    </div>
  );
};
