import type { FC } from "react";

type LineChartLegendEntryProps = {
  color: string;
  isDisabled: boolean;
  onHover: (key: string | undefined) => void;
  onClick: (key: string) => void;
  entryText: string;
};

export const LineChartLegendEntry: FC<LineChartLegendEntryProps> = ({
  color,
  isDisabled,
  onHover,
  onClick,
  entryText,
}) => {
  const disabledClass = "opacity-20";

  return (
    <li
      className={`flex items-center gap-2 px-2 cursor-pointer ${
        isDisabled ? disabledClass : ""
      }`}
      onMouseOver={() => onHover(entryText)}
      onMouseOut={() => onHover(undefined)}
      onClick={() => onClick(entryText)}
    >
      <div className={`w-4 h-4`} style={{ backgroundColor: color }} />
      <span className="text-sm text-white">{entryText}</span>
    </li>
  );
};
