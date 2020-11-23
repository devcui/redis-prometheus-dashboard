import React from "react";
import { API } from "../../../env";
import { http, HTTP_METHODS } from "../../utils/http";
import { Metric } from "../../utils/metrics";
import { METRICS_MAP } from "../../utils/redis_metrics";

const Demo1: React.FC<{}> = (props) => {
  http({
    url: `${API}/monitoring.kube.io/v1alpha2/redis`,
    method: HTTP_METHODS.GET,
  }).subscribe((response: any) => {
    const res: Array<Metric> = response.results;
    res.map((res: Metric) => {
      if (METRICS_MAP[res.metric_name]) {
        const a = METRICS_MAP[res.metric_name](res);
        console.log(a);
      }
    });
  });

  return (
    <div>
      <p>current number: </p>
      {props.children ? props.children : null}
    </div>
  );
};
export default Demo1;
