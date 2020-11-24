import React from "react";
import DateCard, { DateCardState } from "../../components/DateCard";
const Demo2: React.FC<{}> = () => {
  const dateCompleted = (value: DateCardState) => {
    console.log("外", value);
  };
  return <DateCard completed={dateCompleted}></DateCard>;
};
export default Demo2;
