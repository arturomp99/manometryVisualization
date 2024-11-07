import { Chart } from "./components/Chart/Chart";
import { Kpis } from "./components/Kpis";
import { SelectChartType } from "./components/SelectChartType";

export default function Home() {
  return (
    <div>
      <SelectChartType />
      <Chart />
      <Kpis />
    </div>
  );
}
