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
      const readingsArray = Object.entries(readings);
      const rectangles = readingsArray.map(([timestamp, value], index) => ({
        timestampInitial: +timestamp,
        timestampFinal:
          index < readingsArray.length - 1
            ? +readingsArray[index + 1][0]
            : +timestamp,
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
