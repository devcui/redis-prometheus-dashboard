import React, { useEffect, useState } from "react";
import { http, HTTP_METHODS, makeParam } from "../../utils/http";
import { METRICS_MAP, RedisMetrics } from "../../utils/redis_metrics";
import {
  Row,
  Col,
  Card,
  Select,
  Space,
  Button,
  DatePicker,
  message,
} from "antd";
import lodash from "lodash";
import { YzAreaChart, YzLongAreaChart } from "simple-g2-charts";
import { CalendarTwoTone, ClockCircleTwoTone } from "@ant-design/icons";
import moment from "moment";
import { assert } from "console";
import { Subscription } from "rxjs";
import dashes from "./dashs";

const { RangePicker } = DatePicker;
const { Option } = Select;
export interface DashboardProps {}
const startDate = new Date().getTime() / 1000 - 12 * 60 * 60;

const Dashboard: React.FC<DashboardProps> = () => {
  const [step, setStep] = useState<number>();
  const [start, setStart] = useState<number>();
  const [end, setEnd] = useState<number>();
  const [keeping, setKeeping] = useState<boolean>(false);
  const [timer, setTimer] = useState<any>();
  const [dataObj, setDataObj] = useState<RedisMetrics>();

  const stepChange = (v: any) => {
    setStep(v);
  };

  const timeChange = (_: any, dateString: Array<string>) => {
    if (dateString.length >= 1) {
      setStart(new Date(dateString[0]).getTime() / 1000);
      setEnd(new Date(dateString[1]).getTime() / 1000);
    }
  };

  const query = () => {
    setKeeping(false);
    if (!step || !start || !end) {
      message.warn("请将表单填写完整!");
      return;
    }
    http({
      url: `/monitoring.kube.io/v1alpha2/redis${makeParam({
        step,
        start,
        end,
      })}`,
      method: HTTP_METHODS.GET,
    }).subscribe((response: any) => {
      const dataObj: RedisMetrics = {};
      response.results.map((rm: any) => {
        if (METRICS_MAP[rm.metric_name]) {
          const metric_data = METRICS_MAP[rm.metric_name](rm.data);
          dataObj[rm.metric_name] = metric_data;
        }
      });
      setDataObj(dataObj);
    });
    clearInterval(timer);
  };

  const live = () => {
    if (!step) {
      message.warn("请选择时间间隔!");
      return;
    }
    setKeeping(true);
  };

  const stop = () => {
    clearInterval(timer);
    setKeeping(false);
  };

  useEffect(() => {
    console.log(dataObj);
  }, [dataObj]);

  useEffect(() => {
    if (!step) {
      return;
    }
    let _needToUnSub: Array<Subscription> = [];
    _needToUnSub.push(ticktock());
    if (keeping) {
      const t = setInterval(() => {
        _needToUnSub.push(ticktock());
      }, step * 1000);
      setTimer(t);
    }
    return () => {
      clearInterval(timer);
      if (_needToUnSub && _needToUnSub.length > 0) {
        _needToUnSub.forEach((ntu) => ntu.unsubscribe());
      }
    };
  }, [keeping]);

  const ticktock = (): Subscription => {
    const endDate = new Date().getTime() / 1000;
    const param = { start: startDate, end: endDate, step };
    return http({
      url: `/monitoring.kube.io/v1alpha2/redis${makeParam(param)}`,
      method: HTTP_METHODS.GET,
    }).subscribe((response: any) => {
      console.log(response);
      const dataObj: RedisMetrics = {};
      response.results.map((rm: any) => {
        if (METRICS_MAP[rm.metric_name]) {
          const metric_data = METRICS_MAP[rm.metric_name](rm.data);
          dataObj[rm.metric_name] = metric_data;
        }
      });
      setDataObj(dataObj);
    });
  };

  const getValue = (name: string): Array<any> => {
    if (dataObj && dataObj[name]) {
      return [...dataObj[name].value];
    }
    return [];
  };

  const renderDashes = () => {
    return (
      <Row gutter={16}>
        {dashes.map((Comp: React.FC<any>, index: number) => {
          return (
            <Col style={{ marginTop: 10 }} span={12} key={index}>
              {Comp({ getValue })}
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
    <React.Fragment>
      <Card>
        <Row gutter={2}>
          <Col span={6}>
            <RangePicker
              disabled={keeping}
              allowClear={false}
              suffixIcon={<CalendarTwoTone />}
              value={
                start && end ? [moment(start * 1000), moment(end * 1000)] : null
              }
              format="YYYY/MM/DD HH:mm:ss"
              showTime={{ format: "HH:mm:ss" }}
              onChange={timeChange}
            />
          </Col>
          <Col span={5}>
            <Space size="small">
              <Select
                disabled={keeping}
                value={step}
                style={{ width: 240 }}
                onChange={stepChange}
                suffixIcon={<ClockCircleTwoTone />}
              >
                <Option value={60}>1分钟</Option>
                <Option value={120}>2分钟</Option>
                <Option value={300}>5分钟</Option>
                <Option value={600}>10分钟</Option>
                <Option value={900}>15分钟</Option>
                <Option value={1800}>30分钟</Option>
                <Option value={3600}>1小时</Option>
                <Option value={7200}>2小时</Option>
                <Option value={18000}>5小时</Option>
              </Select>
            </Space>
          </Col>
          <Col span={4}>
            <Button type="primary" disabled={keeping} onClick={query}>
              查询
            </Button>
            {keeping ? (
              <Button style={{ marginLeft: 20 }} type="default" onClick={stop}>
                停止
              </Button>
            ) : (
              <Button style={{ marginLeft: 20 }} type="default" onClick={live}>
                监控
              </Button>
            )}
          </Col>
        </Row>
      </Card>
      {renderDashes()}
    </React.Fragment>
  );
};

export default Dashboard;
