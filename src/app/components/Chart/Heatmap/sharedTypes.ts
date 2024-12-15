export type HeatmapDataType = {
  rows: RowDataType[];
};

export type RowDataType = {
  rectangles: RectangleDataType[];
  rowId: string;
};

export type RectangleDataType = {
  timestamp: number;
  sensor: string;
  pressure: number;
};
