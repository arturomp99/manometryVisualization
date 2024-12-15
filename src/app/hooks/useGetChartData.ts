import { useFetchJson } from "./useFetchJson";

export const useGetChartData = () => {
  const { response, isLoading } = useFetchJson("/25min_reduced.json");

  return { data: response, isLoading };
};
