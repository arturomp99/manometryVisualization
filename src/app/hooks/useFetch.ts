import { useEffect, useState } from "react";

export const useFetch = (path: string) => {
  const [data, setData] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(path)
      .then((readData) => {
        setData(readData);
        setIsLoading(false);
      })
      .catch((error) =>
        console.log(`Error fetching data from ${path}\n${error}`)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading };
};
