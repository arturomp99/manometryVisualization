import { useEffect, useState } from "react";
import { json } from "d3";
import { JsonDataType } from "@/utils/jsonDataType";

export const useFetchJson = (path: string) => {
  const [response, setResponse] = useState<JsonDataType | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    json<JsonDataType>(path)
      .then(async (readData) => {
        setResponse(readData);
        setIsLoading(false);
      })
      .catch((error) =>
        console.log(`Error fetching data from ${path}\n${error}`)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { response, isLoading };
};
