import { JsonDataType } from "@/utils/jsonDataType";

import { MultiLineDataType } from "./sharedTypes";

export const mapToLineChartData = (
  data: JsonDataType | undefined
): MultiLineDataType | undefined => {
  if (!data) {
    return;
  }
  const lines: MultiLineDataType["lines"] = Object.entries(data).map(
    ([sensor, readings]) => {
      const points = Object.entries(readings).map(([timestamp, value]) => ({
        x: +timestamp,
        y: value,
      }));

      return {
        points,
        lineId: sensor,
        hovered: false,
      };
    }
  );

  return { lines };
};
