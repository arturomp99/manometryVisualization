import { useEffect, useState } from "react";
import { csv } from "d3";
import type { DSVRowArray } from "d3";

export const useFetchCsv = (path: string) => {
  const [response, setResponse] = useState<DSVRowArray<string> | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    csv(path)
      .then(async (readData) => {
        setResponse(readData);
        setIsLoading(false);
      })
      .catch((error) =>
        console.log(`Error fetching data from ${path}\n${error}`)
      );
  }, [path]);

  return { response, isLoading };
};
