import { Chart } from "@antv/g2/lib";
import DataSet from "@antv/data-set";

import React, { useEffect, useState } from "react";

export interface BrokenLineProp {}
export interface BrokenLineState {
  chart: Chart;
}

const data = [
  { year: "1951 年", sales: 38 },
  { year: "1952 年", sales: 52 },
  { year: "1956 年", sales: 61 },
  { year: "1957 年", sales: 145 },
  { year: "1958 年", sales: 48 },
  { year: "1959 年", sales: 38 },
  { year: "1960 年", sales: 38 },
  { year: "1962 年", sales: 38 },
];

const BrokenLineChart: React.FC<BrokenLineProp> = () => {
  const [state, setState] = useState<BrokenLineState>();

  useEffect(() => {
    if (!state?.chart) {
      const chart = new Chart({
        container: "chart",
        width: 600,
        height: 300,
      });
      setState({ chart });
    }
  });
  state?.chart.data(data);
  setInterval(() => {
    state?.chart.changeData([...data, ...data]);
  }, 3000);
  state?.chart.scale("sales", {
    alias: "销售量",
    // ticks: [10, 20, 30, 40, 60, 80, 100],
    min: 0,
    max: 200,
    tickCount: 10,
    formatter: (v) => `$${v}`,
  });
  state?.chart.scale("year", {
    alias: "年",
  });
  state?.chart.axis("sales", { title: {} });
  state?.chart.axis("year", { title: {} });
  state?.chart.point().position("year*sales").color("sales");
  state?.chart.interval().position("year*sales").color("sales");
  state?.chart.area().position("year*sales").color("sales");
  state?.chart.line().position("year*sales").color("sales");
  state?.chart.render();

  return <div id="chart"></div>;
};

export default BrokenLineChart;
