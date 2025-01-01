import { useEffect } from "react";
import type { FC } from "react";
import type { OverviewChartProps, Padding } from "../sharedTypes";
import type { HeatmapDataType } from "./sharedTypes";
import { useResizableRef } from "@/app/hooks";
import { debouncedDrawHeatmapOverview } from "./drawHeatmap/drawHeatmapOverview";
import { OverviewContainer } from "../../Containers/OverviewContainer";

interface HeatmapOverviewProps extends OverviewChartProps {
  data: HeatmapDataType;
}

const padding: Padding = {
  x: { left: 24, right: 0 },
  y: { top: 8, bottom: 16 },
};

export const HeatmapOverview: FC<HeatmapOverviewProps> = ({
  data,
  onBrush,
}) => {
  const { containerRef, size } = useResizableRef<SVGSVGElement>();

  useEffect(() => {
    debouncedDrawHeatmapOverview({
      parentRef: containerRef.current,
      data,
      size,
      padding,
      onBrush,
    });
  }, [size]);

  return (
    <OverviewContainer>
      <svg className="w-full h-full" ref={containerRef} />
    </OverviewContainer>
  );
};
