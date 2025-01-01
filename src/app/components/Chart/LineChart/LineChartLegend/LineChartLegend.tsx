import { useCallback, useState, type FC } from "react";
import { LineChartLegendEntry } from "./LineChartLegendEntry";
import type { LineChartScalesType } from "../drawLineChart/getLineChartScales";
import type { LineDataType } from "../sharedTypes";
import { useLineHover } from "../useLineHover";

type LineChartLegendProps = {
  keys: string[] | undefined;
  colorScale: LineChartScalesType["colorScale"];
  onHover: ReturnType<typeof useLineHover>["onHover"];
  hoveredEntryId?: string;
};

export const LineChartLegend: FC<LineChartLegendProps> = ({
  keys,
  colorScale,
  onHover,
  hoveredEntryId,
}) => {
  const entryHoverHandler = useCallback(
    (entry: string | undefined) => {
      onHover(undefined, entry);
    },
    [onHover]
  );
  const isAnyHovered = !!hoveredEntryId;

  return !!keys ? (
    <ul className="w-full h-full flex flex-row flex-wrap gap-4 items-center">
      {keys.map((key) => {
        const color = colorScale(key);

        const isHovered = key === hoveredEntryId;
        const isDisabled = isAnyHovered && !isHovered;

        return (
          <LineChartLegendEntry
            key={key}
            color={color}
            isDisabled={isDisabled}
            entryText={key}
            onHover={entryHoverHandler}
          />
        );
      })}
    </ul>
  ) : null;
};
