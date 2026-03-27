import * as React from "react";
import { ru } from "date-fns/locale";
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
export const WithoutDefinedRanges = () => {
  return (
    <DateRangePicker
      open={true}
      onChange={(range) => {
        console.log(range);
      }}
      displayOptions={{ showPredefinedRanges: false, showStartEndDates: true }}
    />
  );
};

export const WithoutStartEndDates = () => {
  return (
    <DateRangePicker
      open={true}
      onChange={(range) => {
        console.log(range);
      }}
      displayOptions={{ showPredefinedRanges: true, showStartEndDates: false }}
    />
  );
};

export const Russian = () => {
  return (
    <DateRangePicker
      open={true}
      onChange={(range) => {
        console.log(range);
      }}
      locale={ru}
      displayOptions={{ showPredefinedRanges: false, showStartEndDates: false }}
    />
  );
};
