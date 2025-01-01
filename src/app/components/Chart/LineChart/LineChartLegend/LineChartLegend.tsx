import { useCallback, useState, type FC } from "react";
import { LineChartScalesType } from "../drawLineChart/getLineChartScales";
import { LineChartLegendEntry } from "./LineChartLegendEntry";

type LineChartLegendProps = {
  keys: string[] | undefined;
  colorScale: LineChartScalesType["colorScale"];
  onHover: () => void;
};

export const LineChartLegend: FC<LineChartLegendProps> = ({
  keys,
  colorScale,
  onHover,
}) => {
  const [hoveredEntry, setHoveredEntry] = useState<string>();
  const entryHoverHandler = useCallback(
    (entry: string | undefined) => {
      setHoveredEntry(entry);
      onHover();
    },
    [onHover]
  );
  const isAnyHovered = !!hoveredEntry;

  return !!keys ? (
    <ul className="w-full h-full flex flex-row flex-wrap gap-4 items-center">
      {keys.map((key) => {
        const color = colorScale(key);

        const isHovered = key === hoveredEntry;
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
