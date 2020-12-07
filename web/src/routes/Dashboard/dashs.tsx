import { Col, Card } from "antd";
import React from "react";
import { YzLongAreaChart } from "simple-g2-charts";

const RedisMemoryUsedBytes: React.FC<any> = ({ getValue }) => {
  return (
    <Card title="redis_memory_used_bytes">
      <YzLongAreaChart
        id="redis_memory_used_bytes"
        data={getValue("redis_memory_used_bytes")}
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
            alias: "使用大小",
            color1: "#6600CC",
            color2: "#33CCFF",
            formatter: (v) => {
              return (v / 1024 / 1024).toFixed(2) + "MB";
            },
          },
        ]}
      ></YzLongAreaChart>
    </Card>
  );
};

const RedisCpuUserSecondsTotal: React.FC<any> = ({ getValue }) => {
  return (
    <Card title="redis_cpu_user_seconds_total">
      <YzLongAreaChart
        id="redis_cpu_user_seconds_total"
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
            color1: "#FF3300",
            color2: "#FFFF33",
            formatter: (v) => {
              return v + "毫秒";
            },
          },
        ]}
      ></YzLongAreaChart>
    </Card>
  );
};

const RedisMemoryUsedLuaBytes: React.FC<any> = ({ getValue }) => {
  return (
    <Card title="redis_memory_used_lua_bytes">
      <YzLongAreaChart
        id="redis_memory_used_lua_bytes"
        data={getValue("redis_memory_used_lua_bytes")}
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
            min: 0,
            alias: "使用大小",
            color1: "#6600CC",
            color2: "#33CCFF",
            formatter: (v) => {
              return (v / 1024 / 1024).toFixed(2) + "MB";
            },
          },
        ]}
      ></YzLongAreaChart>
    </Card>
  );
};

export default [
  RedisMemoryUsedBytes,
  RedisCpuUserSecondsTotal,
  RedisMemoryUsedLuaBytes,
];
