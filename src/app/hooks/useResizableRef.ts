import { useEffect, useRef, useState } from "react";
import { PartialSize } from "../components/Chart/sharedTypes";

export const useResizableRef = <T extends Element>() => {
  const containerRef = useRef<T>(null);

  const [size, setSize] = useState<PartialSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const updateSize = () =>
      setSize(() => ({
        width: containerRef.current?.clientWidth,
        height: containerRef.current?.clientHeight,
      }));
    updateSize();
    window.addEventListener("resize", updateSize);
  }, []);

  return { containerRef, size };
};
