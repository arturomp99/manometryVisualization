import { useCallback, useState, type FC } from "react";
import { LineChartLegendEntry } from "./LineChartLegendEntry";
import type { LineChartScalesType } from "../drawLineChart/getLineChartScales";
import type { LineDataType } from "../sharedTypes";
import { useLineHover } from "../useLineHover";
import { useLegendClickEntry } from "../useLegendClickEntry";

type LineChartLegendProps = {
  keys: string[] | undefined;
  colorScale: LineChartScalesType["colorScale"];
  onHover: ReturnType<typeof useLineHover>["onHover"];
  hoveredEntryId?: string;
  onClick: ReturnType<typeof useLegendClickEntry>["onLegendEntryClick"];
  selectedEntries?: string[];
};

export enum ClickStateEnum {
  ADD,
  REMOVE,
  RESET,
}

export const LineChartLegend: FC<LineChartLegendProps> = ({
  keys,
  colorScale,
  onHover,
  hoveredEntryId,
  onClick,
  selectedEntries,
}) => {
  const [clickState, setClickState] = useState<ClickStateEnum>(
    ClickStateEnum.ADD
  );

  const entryHoverHandler = useCallback(
    (entry: string | undefined) => {
      onHover(undefined, entry);
    },
    [onHover]
  );

  const entryClickHandler = useCallback(
    (entry: string) => {
      const isAlreadySelected = selectedEntries?.find(
        (selectedEntry) => selectedEntry === entry
      );
      if (clickState === ClickStateEnum.ADD) {
        if (isAlreadySelected) {
          if (selectedEntries?.length === 1) {
            setClickState(ClickStateEnum.REMOVE);
            onClick(entry, ClickStateEnum.REMOVE);
          } else {
            setClickState(ClickStateEnum.RESET);
            onClick(entry, ClickStateEnum.RESET);
          }
        } else {
          onClick(entry, clickState);
        }
      } else if (clickState === ClickStateEnum.REMOVE) {
        if (!isAlreadySelected) {
          setClickState(ClickStateEnum.RESET);
          onClick(entry, ClickStateEnum.RESET);
        } else {
          onClick(entry, clickState);
        }
      } else {
        setClickState(ClickStateEnum.ADD);
        onClick(entry, ClickStateEnum.ADD);
      }
    },
    [onClick]
  );

  const isAnyHovered = !!hoveredEntryId;
  const isAnySelected = !!selectedEntries?.length;

  return !!keys ? (
    <ul className="w-full h-full flex flex-row flex-wrap gap-4 items-center">
      {keys.map((key) => {
        const color = colorScale(key);

        const isHovered = key === hoveredEntryId;
        const isSelected = selectedEntries?.find(
          (selectedEntry) => selectedEntry === key
        );
        const isDisabled =
          (isAnySelected && !isSelected) ||
          (!isAnySelected && isAnyHovered && !isHovered);

        return (
          <LineChartLegendEntry
            key={key}
            color={color}
            isDisabled={isDisabled}
            entryText={key}
            onHover={entryHoverHandler}
            onClick={entryClickHandler}
          />
        );
      })}
    </ul>
  ) : null;
};
