import { useMemo, useState } from "react";
import type { FC } from "react";
import type { BrushSelection } from "d3";
import { ChartSettings } from "../ChartSettings/ChartSettings";
import { LineChartLegend } from "./LineChartLegend/LineChartLegend";
import { LineChartOverview } from "./LineChartOverview";
import { ChartProps, OnBrushType } from "../sharedTypes";
import { Spacer } from "@nextui-org/spacer";
import { mapToLineChartData } from "./mapToLineChartData";
import { OverviewContainer } from "../../Containers/OverviewContainer";
import { DetailsContainer } from "../../Containers/DetailsContainer";
import { LineChartDetails } from "./LineChartDetails";
import { getLineChartColorScale } from "./drawLineChart/getLineChartColorScale";

export const LineChart: FC<ChartProps> = ({ data }) => {
  const lineChartData = useMemo(() => mapToLineChartData(data), [data]);
  const [brushSelection, setBrushSelection] = useState<BrushSelection | null>();
  const onBrush: OnBrushType = (brush) => {
    setBrushSelection(brush);
  };
  const { colorScale } = getLineChartColorScale(lineChartData);

  return (
    <>
      <ChartSettings />
      <Spacer y={2} />
      {!!lineChartData ? (
        <LineChartOverview
          data={lineChartData}
          onBrush={onBrush}
          colorScale={colorScale}
        />
      ) : null}
      <Spacer y={2} />
      {!!lineChartData ? (
        <LineChartDetails
          data={lineChartData}
          brush={brushSelection}
          colorScale={colorScale}
          addLegend
        />
      ) : null}
    </>
  );
};
