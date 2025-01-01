import { useEffect, useState } from "react";
import type { FC } from "react";
import type { BrushSelection, ScaleOrdinal } from "d3";

import { useResizableRef } from "@/app/hooks";

import type { MultiLineDataType } from "./sharedTypes";
import type { DetailChartProps, Padding } from "../sharedTypes";
import {
  drawLineChartDetails,
  RedrawLinesFunctionType,
} from "./drawLineChart/drawLineChartDetails";
import { useLineHover } from "./useLineHover";
import { Spacer } from "@nextui-org/spacer";
import { LineChartLegend } from "./LineChartLegend/LineChartLegend";
import { DetailsContainer } from "../../Containers/DetailsContainer";

interface LineChartDetailsProps extends DetailChartProps {
  data: MultiLineDataType;
  colorScale: ScaleOrdinal<string, string, never>;
}

const padding: Padding = {
  x: { left: 24, right: 0 },
  y: { top: 8, bottom: 16 },
};

export const LineChartDetails: FC<LineChartDetailsProps> = ({
  data,
  addLegend,
  brush,
  colorScale,
}) => {
  const { containerRef, size } = useResizableRef<SVGSVGElement>();
  const { hoveredLine, onHover } = useLineHover();

  const [brushUpdate, setBrushUpdate] =
    useState<(brush: BrushSelection | null) => void>();

  const [redrawLines, setRedrawLines] = useState<RedrawLinesFunctionType>();

  useEffect(() => {
    const onSizeChange = setTimeout(() => {
      const updateLineChart = drawLineChartDetails(
        {
          parentRef: containerRef.current,
          data,
          size,
          padding,
          onHover,
        },
        colorScale
      );
      setBrushUpdate(() => updateLineChart?.onBrush);
      setRedrawLines(() => updateLineChart?.redrawLines);
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

  useEffect(() => {
    if (!data) {
      return;
    }
    redrawLines?.(data, hoveredLine);
  }, [data, redrawLines, hoveredLine]);

  return (
    <>
      <DetailsContainer>
        <svg className="w-full h-full" ref={containerRef} />
      </DetailsContainer>

      {addLegend ? (
        <>
          <Spacer y={2} />
          <LineChartLegend
            keys={data?.lines.map((line) => line.lineId)}
            colorScale={colorScale}
            onHover={onHover}
            hoveredEntryId={hoveredLine}
          />
        </>
      ) : null}
    </>
  );
};
