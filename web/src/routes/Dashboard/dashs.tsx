import { Col, Card } from "antd";
import moment from "moment";
import React from "react";
import { Area } from "@ant-design/charts";

const RedisMemoryUsedBytes: React.FC<any> = ({ getValue }) => {
  return (
    <Card title="redis_memory_used_bytes">
      <Area
        height={300}
        autoFit={true}
        data={getValue("redis_memory_used_bytes")}
        xAxis={{
          title: {
            text: "日期",
          },
          label: {
            formatter: (v) => {
              return moment(parseFloat(v) * 1000).format("YYYY-MM-DD hh时 ");
            },
          },
        }}
        yAxis={{
          min: 0,
          title: {
            text: "使用大小",
          },
          label: {
            formatter: (v) => {
              return (parseInt(v) / 1024 / 1024).toFixed(2) + "MB";
            },
          },
        }}
        xField="time"
        yField="value"
        scrollbar={true}
        slider={{
          start: 0,
          end: 1,
          formatter: (v) => {
            return moment(v * 1000).format("YYYY-MM-DD hh时");
          },
        }}
        tooltip={{
          showCrosshairs: true,
          follow: true,
          shared: true,
          crosshairs: {
            type: "xy",
          },
        }}
      ></Area>
    </Card>
  );
};

const RedisCpuUserSecondsTotal: React.FC<any> = ({ getValue }) => {
  return (
    <Card title="redis_cpu_user_seconds_total">
      <Area
        height={300}
        autoFit={true}
        data={getValue("redis_cpu_user_seconds_total")}
        xAxis={{
          title: {
            text: "日期",
          },
          label: {
            formatter: (v) => {
              return moment(parseFloat(v) * 1000).format("YYYY-MM-DD hh时 ");
            },
          },
        }}
        yAxis={{
          min: 0,
          title: {
            text: "使用大小",
          },
          label: {
            formatter: (v) => {
              return `${v}毫秒`;
            },
          },
        }}
        xField="time"
        yField="value"
        scrollbar={true}
        slider={{
          start: 0,
          end: 1,
          formatter: (v) => {
            return moment(v * 1000).format("YYYY-MM-DD hh时");
          },
        }}
        tooltip={{
          showCrosshairs: true,
          follow: true,
          shared: true,
          crosshairs: {
            type: "xy",
          },
        }}
      ></Area>
    </Card>
  );
};

const RedisMemoryUsedLuaBytes: React.FC<any> = ({ getValue }) => {
  return (
    <Card title="redis_memory_used_lua_bytes">
      <Area
        height={300}
        autoFit={true}
        data={getValue("redis_memory_used_lua_bytes")}
        xAxis={{
          title: {
            text: "日期",
          },
          label: {
            formatter: (v) => {
              return moment(parseFloat(v) * 1000).format("YYYY-MM-DD hh时 ");
            },
          },
        }}
        yAxis={{
          min: 0,
          title: {
            text: "使用大小",
          },
          label: {
            formatter: (v) => {
              return (parseInt(v) / 1024 / 1024).toFixed(2) + "MB";
            },
          },
        }}
        xField="time"
        yField="value"
        scrollbar={true}
        slider={{
          start: 0,
          end: 1,
          formatter: (v) => {
            return moment(v * 1000).format("YYYY-MM-DD hh时");
          },
        }}
        tooltip={{
          showCrosshairs: true,
          follow: true,
          shared: true,
          crosshairs: {
            type: "xy",
          },
        }}
      ></Area>
    </Card>
  );
};

const RedisDbKeys: React.FC<any> = ({ getValue }) => {
  console.log(getValue("redis_db_keys"));
  return (
    <Card title="redis_db_keys">
      <Area
        height={300}
        autoFit={true}
        data={getValue("redis_db_keys")}
        xAxis={{
          title: {
            text: "日期",
          },
          label: {
            formatter: (v) => {
              return moment(parseFloat(v) * 1000).format("YYYY-MM-DD hh:mm:ss");
            },
          },
        }}
        yAxis={{
          min: 0,
          title: {
            text: "key/value数量",
          },
        }}
        xField="time"
        yField="value"
        seriesField="db"
        scrollbar={true}
        slider={{
          start: 0,
          end: 1,
          formatter: (v) => {
            return moment(v * 1000).format("YYYY-MM-DD hh:mm:ss");
          },
        }}
        tooltip={{
          showCrosshairs: true,
          follow: true,
          shared: true,
          crosshairs: {
            type: "xy", // 展示十字辅助线
          },
        }}
      ></Area>
    </Card>
  );
};

export default [
  RedisMemoryUsedBytes,
  RedisCpuUserSecondsTotal,
  RedisMemoryUsedLuaBytes,
  RedisDbKeys,
];
