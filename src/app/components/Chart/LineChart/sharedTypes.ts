export type MultiLineDataType = {
  lines: LineDataType[];
};

export type LineDataType = {
  points: PointDataType[];
  lineId: string;
  hovered: boolean;
  selected: boolean;
};

export type PointDataType = {
  x: number;
  y: number;
};
