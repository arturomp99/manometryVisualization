import { useState } from "react";
import { LineDataType } from "./sharedTypes";

export const useLineHover = () => {
  const [hoveredLine, setHoveredLine] = useState<string>();

  const onHover = (line: LineDataType | null) => {
    setHoveredLine(line?.lineId || "");
  };

  return { hoveredLine, onHover };
};
