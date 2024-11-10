import { MultiLineDataType } from "../sharedTypes";
import { getLineChartScales } from "./getLineChartScales";

export const mapToPx = (
  data: MultiLineDataType,
  scales: ReturnType<typeof getLineChartScales>
): MultiLineDataType => {
  const { xScale, yScale } = scales;
  const mappedLines: MultiLineDataType["lines"] = data.lines.map((line) => {
    const mappedPoints = line.points.map((point) => ({
      x: xScale(point.x),
      y: yScale(point.y),
    }));
    return {
      points: mappedPoints,
      lineId: line.lineId,
    };
  });

  return { lines: mappedLines };
};
