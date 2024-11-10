import { FC, useMemo } from "react";
import { ChartSettings } from "../ChartSettings/ChartSettings";
import { Legend } from "../Legend";
import { LineChartOverview } from "./LineChartOverview";
import { ChartProps } from "../sharedTypes";
import { Spacer } from "@nextui-org/spacer";
import { mapToLineChartData } from "./mapToLineChartData";
import { OverviewContainer } from "../../Containers/OverviewContainer";
import { DetailsContainer } from "../../Containers/DetailsContainer";
import { LineChartDetails } from "./LineChartDetails";

export const LineChart: FC<ChartProps> = ({ data }) => {
  const lineChartData = useMemo(() => mapToLineChartData(data), [data]);

  return (
    <>
      <ChartSettings />
      <Spacer y={2} />
      <OverviewContainer>
        {!!lineChartData ? <LineChartOverview data={lineChartData} /> : null}
      </OverviewContainer>
      <Spacer y={2} />
      <DetailsContainer>
        {!!lineChartData ? <LineChartDetails data={lineChartData} /> : null}
      </DetailsContainer>
      <Spacer y={2} />
      <Legend />
    </>
  );
};
