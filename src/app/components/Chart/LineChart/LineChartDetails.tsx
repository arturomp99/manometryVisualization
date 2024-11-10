import { useEffect, useState } from "react";
import type { FC } from "react";
import type { MultiLineDataType } from "./sharedTypes";
import { useResizableRef } from "@/app/hooks";
import type { DetailChartProps, Padding } from "../sharedTypes";
import { BrushSelection } from "d3";

interface LineChartDetailsProps extends DetailChartProps {
  data: MultiLineDataType;
}

const padding: Padding = {
  x: { left: 24, right: 0 },
  y: { top: 8, bottom: 16 },
};

export const LineChartDetails: FC<LineChartDetailsProps> = ({
  data,
  brush,
}) => {
  const { containerRef, size } = useResizableRef<SVGSVGElement>();

  const [brushUpdate, setBrushUpdate] =
    useState<(brush: BrushSelection) => void>();

  useEffect(() => {}, [size]);

  useEffect(() => {
    brushUpdate?.(brush);
  }, [brush, brushUpdate]);

  return (
    <div className="w-full h-full">
      <svg className="w-full h-full" ref={containerRef} />
    </div>
  );
};
