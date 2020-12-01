import React, { useEffect, useState } from "react";
import DateCard, { DateCardState } from "../../components/DateCard";
import { http, HTTP_METHODS, makeParam } from "../../utils/http";
import { METRICS_MAP, RedisMetric } from "../../utils/redis_metrics";
import { Row, Col, Divider, Card } from "antd";

export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [timer, setTimer] = useState(null);

  useEffect(() => {}, [timer]);

  const once = (d: DateCardState) => {
    http({
      url: `/monitoring.kube.io/v1alpha2/redis${makeParam(d)}`,
      method: HTTP_METHODS.GET,
      body: null,
    }).subscribe((response: any) => {
      console.log("once;");
      const chartData = handleData(response);
      console.log(chartData);
    });
  };

  const now = (step: number) => {
    http({
      url: `/monitoring.kube.io/v1alpha2/redis?step=${step}`,
      method: HTTP_METHODS.GET,
      body: null,
    }).subscribe((response: any) => {
      console.log("now");
      const chartData = handleData(response);
      console.log(chartData);
    });
  };

  const dataChange = (d: DateCardState) => {
    clearInterval(timer as any);
    if (d.reset) {
      const $time = setInterval(() => {
        now(d.step);
      }, 5000);
      setTimer($time as any);
    } else {
      once(d);
    }
  };

  const handleData = (response: any): RedisMetric | Array<RedisMetric> => {
    return response.results
      .map((m: any) => {
        if (METRICS_MAP[m.metric_name]) {
          return METRICS_MAP[m.metric_name](m.data);
        }
      })
      .filter((v: any) => v != undefined);
  };

  return (
    <Card>
      <Row gutter={16}>
        <Col span={10} push={14}>
          <DateCard completed={dataChange} />
        </Col>
      </Row>
      <Row gutter={16}>
          
      </Row>
    </Card>
  );
};

export default Dashboard;
