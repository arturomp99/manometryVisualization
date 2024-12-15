import { HeatmapDataType } from "./sharedTypes";
import { JsonDataType } from "@/utils/jsonDataType";

export const mapToHeatmapData = (
  data: JsonDataType | undefined
): HeatmapDataType | undefined => {
  if (!data) {
    return;
  }
  const rows: HeatmapDataType["rows"] = Object.entries(data).map(
    ([sensor, readings]) => {
      const rectangles = Object.entries(readings).map(([timestamp, value]) => ({
        timestamp: +timestamp,
        sensor,
        pressure: +value,
      }));

      return {
        rectangles,
        rowId: sensor,
      };
    }
  );

  return { rows };
};
