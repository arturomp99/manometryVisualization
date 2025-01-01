import type { FC } from "react";

type LineChartLegendEntryProps = {
  color: string;
  isDisabled: boolean;
  onHover: (key: string | undefined) => void;
  entryText: string;
};

export const LineChartLegendEntry: FC<LineChartLegendEntryProps> = ({
  color,
  isDisabled,
  onHover,
  entryText,
}) => {
  const disabledClass = "opacity-50";

  return (
    <li
      className={`flex items-center gap-2 px-2 cursor-pointer ${
        isDisabled ? disabledClass : ""
      }`}
      onMouseOver={() => onHover(entryText)}
      onMouseOut={() => onHover(undefined)}
    >
      <div className={`w-4 h-4`} style={{ backgroundColor: color }} />
      <span className="text-sm text-white">{entryText}</span>
    </li>
  );
};
