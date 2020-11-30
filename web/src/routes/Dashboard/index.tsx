import { clear } from "console";
import React, { useEffect, useState } from "react";
import DateCard, { DateCardState } from "../../components/DateCard";
import { http, HTTP_METHODS, makeParam } from "../../utils/http";

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
      console.log(response);
    });
  };

  const now = (step: number) => {
    http({
      url: `/monitoring.kube.io/v1alpha2/redis?step=${step}`,
      method: HTTP_METHODS.GET,
      body: null,
    }).subscribe((response: any) => {
      console.log(response);
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

  return <DateCard completed={dataChange} />;
};

export default Dashboard;
