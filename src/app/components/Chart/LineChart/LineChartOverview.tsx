import { FC, useEffect } from "react";
import type { MultiLineDataType } from "./sharedTypes";
import type { OverviewChartProps, Padding } from "../sharedTypes";
import { debouncedDrawLineChartOverview } from "./drawLineChart/drawLineChartOverview";
import { useResizableRef } from "@/app/hooks";

interface LineChartOverviewProps extends OverviewChartProps {
  data: MultiLineDataType;
}

const padding: Padding = {
  x: { left: 24, right: 0 },
  y: { top: 8, bottom: 16 },
};

export const LineChartOverview: FC<LineChartOverviewProps> = ({
  data,
  onBrush,
}) => {
  const { containerRef, size } = useResizableRef<SVGSVGElement>();

  useEffect(
    () =>
      debouncedDrawLineChartOverview({
        parentRef: containerRef.current,
        data,
        size,
        padding,
        onBrush,
      }),
    [size]
  );

  return (
    <div className="w-full h-full">
      <svg className="w-full h-full" ref={containerRef} />
    </div>
  );
};
