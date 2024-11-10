import { useMemo, useState } from "react";
import type { FC } from "react";
import type { BrushSelection } from "d3";
import { ChartSettings } from "../ChartSettings/ChartSettings";
import { Legend } from "../Legend";
import { LineChartOverview } from "./LineChartOverview";
import { ChartProps, OnBrushType } from "../sharedTypes";
import { Spacer } from "@nextui-org/spacer";
import { mapToLineChartData } from "./mapToLineChartData";
import { OverviewContainer } from "../../Containers/OverviewContainer";
import { DetailsContainer } from "../../Containers/DetailsContainer";
import { LineChartDetails } from "./LineChartDetails";

export const LineChart: FC<ChartProps> = ({ data }) => {
  const lineChartData = useMemo(() => mapToLineChartData(data), [data]);
  const [brushSelection, setBrushSelection] = useState<BrushSelection | null>();
  const onBrush: OnBrushType = (brush) => {
    setBrushSelection(brush);
  };

  return (
    <>
      <ChartSettings />
      <Spacer y={2} />
      <OverviewContainer>
        {!!lineChartData ? (
          <LineChartOverview data={lineChartData} onBrush={onBrush} />
        ) : null}
      </OverviewContainer>
      <Spacer y={2} />
      <DetailsContainer>
        {!!lineChartData ? (
          <LineChartDetails data={lineChartData} brush={brushSelection} />
        ) : null}
      </DetailsContainer>
      <Spacer y={2} />
      <Legend />
    </>
  );
};
