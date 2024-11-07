import { ChartSettings } from "./ChartSettings/ChartSettings";
import { Details } from "./Details";
import { Legend } from "./Legend";
import { Overview } from "./Overview";

export const Chart = () => {
  return (
    <>
      <ChartSettings />
      <Overview />
      <Details />
      <Legend />
    </>
  );
};
