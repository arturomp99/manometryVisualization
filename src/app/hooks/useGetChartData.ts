import { useFetchCsv } from "./useFetchCsv";

export const useGetChartData = () => {
  const { response, isLoading } = useFetchCsv("/data.csv");
  return { data: response, isLoading };
};
