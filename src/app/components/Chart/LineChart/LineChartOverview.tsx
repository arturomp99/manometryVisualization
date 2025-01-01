import { FC, useEffect } from "react";
import type { ScaleOrdinal } from "d3";
import type { MultiLineDataType } from "./sharedTypes";
import type { OverviewChartProps, Padding } from "../sharedTypes";
import { debouncedDrawLineChartOverview } from "./drawLineChart/drawLineChartOverview";
import { useResizableRef } from "@/app/hooks";
import { OverviewContainer } from "../../Containers/OverviewContainer";

interface LineChartOverviewProps extends OverviewChartProps {
  data: MultiLineDataType;
  colorScale: ScaleOrdinal<string, string, never>;
}

const padding: Padding = {
  x: { left: 24, right: 0 },
  y: { top: 8, bottom: 16 },
};

export const LineChartOverview: FC<LineChartOverviewProps> = ({
  data,
  onBrush,
  colorScale,
}) => {
  const { containerRef, size } = useResizableRef<SVGSVGElement>();

  useEffect(
    () =>
      debouncedDrawLineChartOverview(
        {
          parentRef: containerRef.current,
          data,
          size,
          padding,
          onBrush,
        },
        colorScale
      ),
    [size]
  );

  return (
    <OverviewContainer>
      <svg className="w-full h-full" ref={containerRef} />
    </OverviewContainer>
  );
};
