import React from "react";
import BrokenLineChart from "../../components/Charts/BrokenLineChart";
import DateCard, { DateCardState } from "../../components/DateCard";
const Demo2: React.FC<{}> = () => {
  const dateCompleted = (value: DateCardState) => {
    console.log("外", value);
  };
  return (
    <>
      <DateCard completed={dateCompleted}></DateCard>
      <BrokenLineChart></BrokenLineChart>
    </>
  );
};
export default Demo2;
