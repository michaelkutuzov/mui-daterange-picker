import * as React from "react";
import { ru } from "date-fns/locale";
import { DateRangePicker } from "./DateRangePicker";
import { getDefaultRanges } from "@root/defaults";

export const Default = () => {
  return (
    <DateRangePicker
      open={true}
      onChange={(range) => {
        console.log(range);
      }}
      definedRanges={getDefaultRanges(new Date())}
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
      definedRanges={getDefaultRanges(new Date())}
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
    />
  );
};
