import React, { useEffect, useState } from "react";
import DateCard, { DateCardState } from "../../components/DateCard";
import { http, HTTP_METHODS, makeParam } from "../../utils/http";
import {
  METRICS_MAP,
  RedisMetrics,
  RedisMetricValue,
} from "../../utils/redis_metrics";
import { Row, Col, Divider, Card } from "antd";
import lodash from "lodash";
import { YzAreaChart } from "simple-g2-charts";

export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [timer, setTimer] = useState(null);
  const [chartData, setChartData] = useState<RedisMetrics>();

  useEffect(() => {}, [timer]);

  const once = (d: DateCardState) => {
    http({
      url: `/monitoring.kube.io/v1alpha2/redis${makeParam(d)}`,
      method: HTTP_METHODS.GET,
    }).subscribe((response: any) => {
      setChartData(handleData(response));
    });
  };

  const now = (d: DateCardState) => {
    http({
      url: `/monitoring.kube.io/v1alpha2/redis?step=${d.step}&start=${
        d.start
      }&end=${new Date().getTime() / 1000}`,
      method: HTTP_METHODS.GET,
    }).subscribe((response: any) => {
      setChartData(handleData(response));
    });
  };

  const dataChange = (d: DateCardState) => {
    clearInterval(timer as any);
    if (d.reset) {
      const $time = setInterval(() => {
        now(d);
      }, 5000);
      setTimer($time as any);
    } else {
      once(d);
    }
  };

  const handleData = (response: any): RedisMetrics => {
    const redisMetrics: RedisMetrics = {};
    response.results.map((m: any) => {
      if (METRICS_MAP[m.metric_name]) {
        lodash.merge(redisMetrics, METRICS_MAP[m.metric_name](m.data));
      }
    });
    return redisMetrics;
  };

  const render_REDIS_CPU_USER_SECONDS_TOTAL = () => {
    console.log(chartData);
    if (chartData) {
      return (
        <Card>
          <YzAreaChart
            height={300}
            width={300}
            autoFit={true}
            data={chartData["redis_cpu_user_seconds_total"].value}
            xname="时间"
            xindex="time"
            yname="使用量"
            yindex="value"
          />
        </Card>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Row gutter={16}>
      <Col span={14}>{render_REDIS_CPU_USER_SECONDS_TOTAL()}</Col>
      <Col span={10}>
        <DateCard completed={dataChange} />
      </Col>
    </Row>
  );
};

export default Dashboard;
