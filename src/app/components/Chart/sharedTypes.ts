import { BrushSelection, DSVRowArray } from "d3";

export type ChartProps = {
  data: DSVRowArray<string> | undefined;
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
