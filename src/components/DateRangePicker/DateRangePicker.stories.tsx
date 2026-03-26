import * as React from "react";
import { DateRangePicker } from "./DateRangePicker";

export const Default = () => {
  return (
    <DateRangePicker
      open={true}
      onChange={(range) => {
        console.log(range);
      }}
    />
  );
};
