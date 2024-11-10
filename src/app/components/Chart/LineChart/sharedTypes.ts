export type MultiLineDataType = {
  lines: LineDataType[];
};

export type LineDataType = {
  points: PointDataType[];
  lineId: string;
};

export type PointDataType = {
  x: number;
  y: number;
};
