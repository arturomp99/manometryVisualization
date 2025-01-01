import { scaleOrdinal } from "d3";
import type { MultiLineDataType } from "../sharedTypes";
import { LineChartScalesType } from "./getLineChartScales";

// generated with colorgorical (length is 36)
const colorPalette = [
  "rgb(82,239,153)",
  "rgb(140,46,99)",
  "rgb(170,227,164)",
  "rgb(58,18,131)",
  "rgb(118,240,20)",
  "rgb(14,13,44)",
  "rgb(173,213,31)",
  "rgb(72,86,243)",
  "rgb(112,142,48)",
  "rgb(204,150,235)",
  "rgb(11,57,17)",
  "rgb(228,91,199)",
  "rgb(28,152,32)",
  "rgb(233,20,81)",
  "rgb(52,218,234)",
  "rgb(90,49,12)",
  "rgb(177,200,235)",
  "rgb(123,9,5)",
  "rgb(246,163,159)",
  "rgb(55,68,117)",
  "rgb(223,138,29)",
  "rgb(114,32,246)",
  "rgb(241,212,56)",
  "rgb(80,137,183)",
  "rgb(254,89,0)",
  "rgb(31,147,131)",
  "rgb(147,112,86)",
  "rgb(248,224,169)",
  "rgb(14,200,101)",
  "rgb(217,63,211)",
  "rgb(187,226,114)",
  "rgb(87,43,158)",
  "rgb(118,240,20)",
  "rgb(125,10,246)",
  "rgb(126,155,61)",
  "rgb(16,7,57)",
];

export const getLineChartColorScale = (
  data: MultiLineDataType | undefined
): Pick<LineChartScalesType, "colorScale"> => {
  const lineIds = data?.lines.map((line) => line.lineId);
  const colorScale = scaleOrdinal<string>().domain(lineIds || []);
  colorScale.range(colorPalette);

  return { colorScale };
};
