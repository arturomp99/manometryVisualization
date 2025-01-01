import { useEffect, useState } from "react";
import type { FC } from "react";
import type { BrushSelection, ScaleSequential } from "d3";
import { Spacer } from "@nextui-org/spacer";

import { useResizableRef } from "@/app/hooks";

import type { DetailChartProps, Padding } from "../sharedTypes";
import type { HeatmapDataType } from "./sharedTypes";
import { drawHeatmapDetails } from "./drawHeatmap/drawHeatmapDetails";
import { HeatmapLegend } from "./HeatmapLegend/HeatmapLegend";
import { DetailsContainer } from "../../Containers/DetailsContainer";

interface HeatmapDetailsProps extends DetailChartProps {
  data: HeatmapDataType;
}

const padding: Padding = {
  x: { left: 24, right: 0 },
  y: { top: 8, bottom: 16 },
};

export const HeatmapDetails: FC<HeatmapDetailsProps> = ({
  data,
  addLegend,
  brush,
}) => {
  const { containerRef, size } = useResizableRef<SVGSVGElement>();

  const [brushUpdate, setBrushUpdate] =
    useState<(brush: BrushSelection | null) => void>();
  const [colorScale, setColorScale] =
    useState<ScaleSequential<string, never>>();

  useEffect(() => {
    const onSizeChange = setTimeout(() => {
      const { onBrush, colorScale } = drawHeatmapDetails({
        parentRef: containerRef.current,
        data,
        size,
        padding,
      });
      setBrushUpdate(() => onBrush);
      setColorScale(() => colorScale);
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
    <>
      <DetailsContainer>
        <svg className="w-full h-full" ref={containerRef} />
      </DetailsContainer>
      {addLegend ? (
        <>
          <Spacer y={2} />
          <HeatmapLegend colorScale={colorScale} />
        </>
      ) : null}
    </>
  );
};
