import { useState } from "react";
import { ClickStateEnum } from "./LineChartLegend/LineChartLegend";

export const useLegendClickEntry = (allEntries: string[]) => {
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);

  const onLegendEntryClick = (entryId: string, clickState: ClickStateEnum) => {
    switch (clickState) {
      case ClickStateEnum.ADD:
        setSelectedEntries((prevSelectedEntries) => [
          ...prevSelectedEntries,
          entryId,
        ]);
        break;
      case ClickStateEnum.REMOVE:
        selectedEntries.length > 1
          ? setSelectedEntries((prevSelectedEntries) =>
              prevSelectedEntries.filter((prevEntry) => prevEntry !== entryId)
            )
          : setSelectedEntries(() =>
              allEntries.filter((entry) => entry !== entryId)
            );
        break;
      case ClickStateEnum.RESET:
        setSelectedEntries([]);
        break;
    }
  };

  return { selectedEntries, onLegendEntryClick };
};
