import { useEffect, useState } from "react";
import type { FC } from "react";
import type { BrushSelection } from "d3";
import { Spacer } from "@nextui-org/spacer";

import { useResizableRef } from "@/app/hooks";

import type { DetailChartProps, OnBrushType, Padding } from "../sharedTypes";
import type { HeatmapDataType } from "./sharedTypes";
import { drawHeatmapDetails } from "./drawHeatmap/drawHeatmapDetails";
import { HeatmapLegend } from "./HeatmapLegend/HeatmapLegend";
import { DetailsContainer } from "../../Containers/DetailsContainer";
import { HeatmapScalesType } from "./drawHeatmap/getHeatmapScales";

interface HeatmapDetailsProps extends DetailChartProps {
  data: HeatmapDataType;
}

const padding: Padding = {
  x: { left: 32, right: 0 },
  y: { top: 8, bottom: 16 },
};

export const HeatmapDetails: FC<HeatmapDetailsProps> = ({
  data,
  addLegend,
  brush,
}) => {
  const { containerRef, size } = useResizableRef<SVGSVGElement>();

  const [brushUpdate, setBrushUpdate] =
    useState<ReturnType<typeof drawHeatmapDetails>["onBrush"]>();
  const [colorScale, setColorScale] =
    useState<HeatmapScalesType["colorScale"]>();

  const [legendBrush, setLegendBrush] = useState<BrushSelection | null>(null);
  const [onLegendBrush, setOnLegendBrush] = useState<OnBrushType>(() => {});

  useEffect(() => {
    const onSizeChange = setTimeout(() => {
      const {
        onBrush,
        onLegendBrush: heatmapLegendBrushCallback,
        colorScale,
      } = drawHeatmapDetails({
        parentRef: containerRef.current,
        data,
        size,
        padding,
      });

      setBrushUpdate(() => onBrush);
      setOnLegendBrush(() => heatmapLegendBrushCallback);
      setColorScale(() => colorScale);
    }, 500);

    return () => clearTimeout(onSizeChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  useEffect(() => {
    if (brush === undefined) {
      return;
    }
    brushUpdate?.(brush, legendBrush);
  }, [brush, brushUpdate]);

  useEffect(() => {
    onLegendBrush?.(legendBrush);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [legendBrush]);

  return (
    <>
      <DetailsContainer>
        <svg className="w-full h-full" ref={containerRef} />
      </DetailsContainer>
      {addLegend ? (
        <>
          <Spacer y={2} />
          <HeatmapLegend colorScale={colorScale} onBrush={setLegendBrush} />
        </>
      ) : null}
    </>
  );
};
