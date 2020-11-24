import { DatePicker, Select, Space, Button, Card, message } from "antd";
import { ClockCircleTwoTone, CalendarTwoTone } from "@ant-design/icons";
import React, { useState } from "react";
import lodash from "lodash";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;

export interface DateCardProp {
  completed: (d: DateCardState) => void;
}
export interface DateCardState {
  start: number;
  end: number;
  queryTime: number;
  step: number;
}

export const InitDateCardState = (): DateCardState => {
  return lodash.cloneDeep({
    start: new Date().getTime() / 1000 - 24 * 60 * 60,
    end: new Date().getTime() / 1000,
    queryTime: 24,
    step: 3600,
  });
};

const DateCard: React.FC<DateCardProp> = (props: DateCardProp) => {
  const [state, setState] = useState<DateCardState>(InitDateCardState());

  const onRangePickerChange = (value: any, dateString: Array<string>) => {
    if (dateString.length >= 1) {
      setState({
        ...state,
        start: new Date(dateString[0]).getTime() / 1000,
        end: new Date(dateString[1]).getTime() / 1000,
      });
    }
  };

  const onStepSelectChange = (value: any) => {
    setState({ ...state, step: value });
  };

  const onOk = () => {
    if (!state.start || !state.end) {
      message.info("请选择开始日期和截止日期!");
      return;
    }
    const queryTime = parseInt(
      ((state.end - state.start) / state.step).toFixed(0)
    );
    const newState = { ...state, queryTime };
    setState(newState);
    props.completed(newState);
  };

  const onCancel = () => {
    setState(InitDateCardState());
  };

  return (
    <Card>
      <Space size="small" direction="vertical">
        <div>时间段</div>
        <RangePicker
          suffixIcon={<CalendarTwoTone />}
          value={[moment(state.start * 1000), moment(state.end * 1000)]}
          showTime={{ format: "HH:mm:ss" }}
          format="YYYY-MM-DD HH:mm:ss"
          onChange={onRangePickerChange}
        />
        <div>时间间隔</div>
        <Space size="small">
          <Select
            value={state.step}
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
          <Button type="primary" size="middle" onClick={onOk}>
            确定
          </Button>
          <Button type="primary" size="middle" onClick={onCancel}>
            重置
          </Button>
        </Space>
      </Space>
    </Card>
  );
};

export default DateCard;
