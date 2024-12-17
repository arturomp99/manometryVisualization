import type { BrushSelection } from "d3";

import type { JsonDataType } from "@/utils/jsonDataType";

export type ChartProps = {
  data: JsonDataType | undefined;
};

export type OverviewChartProps = {
  onBrush: OnBrushType;
};

export type DetailChartProps = {
  brush: BrushSelection | null | undefined;
};

export type PartialSize = {
  width?: number;
  height?: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Padding = {
  x: { left: number; right: number };
  y: { top: number; bottom: number };
};

export type OnBrushType = (brush: BrushSelection | null) => void;

export type DrawOverviewArgs<DataType> = {
  parentRef: SVGSVGElement | null;
  data: DataType;
  size: PartialSize;
  padding: Padding;
  onBrush: OnBrushType;
};
export type DrawDetailsArgs<DataType> = {
  parentRef: SVGSVGElement | null;
  data: DataType;
  size: PartialSize;
  padding: Padding;
};
