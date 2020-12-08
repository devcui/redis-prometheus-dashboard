import { Col, Card } from "antd";
import moment from "moment";
import React from "react";
import { YzAreaChart, YzLongAreaChart } from "simple-g2-charts";

const RedisMemoryUsedBytes: React.FC<any> = ({ getValue }) => {
  return (
    <Card title="redis_memory_used_bytes">
      <YzLongAreaChart
        id="redis_memory_used_bytes"
        data={getValue("redis_memory_used_bytes")}
        xindex="time"
        autoFit={true}
        height={300}
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
        height={300}
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
        height={300}
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

const RedisDbKeys: React.FC<any> = ({ getValue }) => {
  console.log(getValue("redis_db_keys"));
  return (
    <Card title="redis_db_keys">
      <YzAreaChart
        id="redis_db_keys"
        height={300}
        autoFit={true}
        data={getValue("redis_db_keys")}
        xname="时间"
        xindex="time"
        yname="数量"
        yindex="value"
        colorExp="db"
        xformat={(text) => {
          const d = new Date(parseFloat(text) * 1000);
          const m = moment(d).format("YYYY-MM-DD HH:mm");
          console.log(m)
          return m;
        }}
      />
    </Card>
  );
};

export default [
  RedisMemoryUsedBytes,
  RedisCpuUserSecondsTotal,
  RedisMemoryUsedLuaBytes,
  RedisDbKeys,
];
