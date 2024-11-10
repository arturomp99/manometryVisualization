import { DSVRowArray } from "d3";
import { MultiLineDataType } from "./sharedTypes";

export const mapToLineChartData = (
  data: DSVRowArray<string> | undefined
): MultiLineDataType | undefined => {
  if (!data) {
    return;
  }
  const lines: MultiLineDataType["lines"] = data.map((dataRow, index) => {
    const points = Object.entries(dataRow).map((entry) => ({
      x: +entry[0],
      y: +entry[1],
    }));
    return {
      points,
      lineId: `${index}`,
    };
  });

  return { lines };
};
