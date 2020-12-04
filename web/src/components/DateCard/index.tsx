import {
  DatePicker,
  Select,
  Space,
  Button,
  Card,
  message,
  Row,
  Col,
} from "antd";
import { ClockCircleTwoTone, CalendarTwoTone } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import lodash from "lodash";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;

export interface DateCardProps {
  keeping: boolean;
  complete: (state: DateCardState) => void;
}
export interface DateCardState {
  start?: number;
  end?: number;
  step?: number;
}

const DateCard: React.FC<DateCardProps> = ({ complete, keeping }) => {
  const [state, setState] = useState<DateCardState>();

  const dateChange = (_: any, dateString: Array<string>) => {
    if (dateString.length >= 1) {
      const start = new Date(dateString[0]).getTime() / 1000;
      const end = new Date(dateString[1]).getTime() / 1000;
      setState(lodash.merge(state, { start, end }));
      if (state) complete(state);
    }
  };
  const onStepSelectChange = (v: any) => {
    setState(lodash.merge(state, { step: v }));
    if (state) complete(state);
  };

  return (
    <Row gutter={16}>
      <Col span={10}>
        <RangePicker
          disabled={keeping}
          allowClear={false}
          suffixIcon={<CalendarTwoTone />}
          value={
            state?.start && state?.end
              ? [moment(state.start * 1000), moment(state.end * 1000)]
              : null
          }
          format="YYYY/MM/DD HH:mm:ss"
          showTime={{ format: "HH:mm:ss" }}
          onChange={dateChange}
        />
      </Col>
      <Col span={10}>
        <Space size="small">
          <Select
            disabled={keeping}
            value={state?.step}
            style={{ width: 240 }}
            onChange={onStepSelectChange}
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
    </Row>
  );
};

export default DateCard;
