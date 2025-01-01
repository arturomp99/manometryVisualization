import { useState } from "react";
import { LineDataType } from "./sharedTypes";

export const useLineHover = () => {
  const [hoveredLine, setHoveredLine] = useState<string>();

  const onHover = (line?: LineDataType | null, lineId?: string | null) => {
    setHoveredLine(line?.lineId || lineId || "");
  };

  return { hoveredLine, onHover };
};
