export type HeatmapDataType = {
  rows: RowDataType[];
};

export type RowDataType = {
  rectangles: RectangleDataType[];
  rowId: string;
};

export type RectangleDataType = {
  timestampInitial: number;
  timestampFinal: number;
  sensor: string;
  pressure: number;
};
