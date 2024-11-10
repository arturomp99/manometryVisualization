import { Charts } from "./components/Chart/Charts";
import { Kpis } from "./components/Kpis";

export default async function Home() {
  return (
    <div className="min-h-screen px-4 sm:px-8 lg:px-16 py-4">
      <Charts />
      <Kpis />
    </div>
  );
}
