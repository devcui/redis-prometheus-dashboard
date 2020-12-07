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

const { RangePicker } = DatePicker;
const { Option } = Select;
export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const startDate = new Date().getTime() / 1000 - 24 * 60 * 60;
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
    if (keeping) {
      const t = setInterval(() => {
        const endDate = new Date().getTime() / 1000;
        const param = { start: startDate, end: endDate, step };
        http({
          url: `/monitoring.kube.io/v1alpha2/redis${makeParam(param)}`,
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
      }, 3000);
      setTimer(t);
    }
    return () => {
      clearInterval(timer);
    };
  }, [keeping]);

  const getValue = (name: string): Array<any> => {
    if (dataObj && dataObj[name]) {
      return [...dataObj[name].value];
    }
    return [];
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
      <br />
      <Row gutter={16}>
        <Col span={12}>

          <Card title="redis_cpu_user_seconds_total">
            <YzLongAreaChart
              data={getValue("redis_cpu_user_seconds_total")}
              xindex="time"
              autoFit={true}
              height={500}
              scales={[
                {
                  index: "time",
                  type: "time",
                  alias: "时间",
                  tickCount: 20,
                  mask: "MM/DD HH:mm:ss",
                },
                {
                  index: "value",
                  alias: "占用时长",
                  color1: "#a50f15",
                  color2: "#fee5d9",
                  formatter: (v) => {
                    return v + "秒";
                  },
                },
              ]}
            ></YzLongAreaChart>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Dashboard;
