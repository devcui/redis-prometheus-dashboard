import React, { useEffect, useState } from "react";
import DateCard, { DateCardState } from "../../components/DateCard";
import { http, HTTP_METHODS, makeParam } from "../../utils/http";
import { METRICS_MAP, RedisMetrics } from "../../utils/redis_metrics";
import { Row, Col, Card } from "antd";
import lodash from "lodash";
import { YzAreaChart } from "simple-g2-charts";

export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [keeping, setKeeping] = useState<boolean>(false);

  const dateChange = (d: DateCardState) => {
    console.log(d);
  };
  return (
    <Row gutter={16}>
      <Col span={10}>
        <DateCard complete={dateChange} keeping={keeping}></DateCard>
      </Col>
    </Row>
  );
};

export default Dashboard;
