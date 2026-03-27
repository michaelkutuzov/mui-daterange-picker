/* eslint-disable object-curly-newline */
import React from "react";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { differenceInCalendarMonths, format } from "date-fns";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import { Month } from "@components/Month";
import { DefinedRanges } from "../DefinedRanges";
import type { DateRange, DefinedRange, Setter, NavigationAction } from "../../types";
import { MARKERS } from "../Markers";
import { DisplayOptions } from "@components/DateRangePicker/DateRangePicker";

export interface MenuProps {
  dateRange: DateRange;
  ranges: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
  locale?: Locale;
  displayOptions?: DisplayOptions;
}

export const Menu: React.FunctionComponent<MenuProps> = (props: MenuProps) => {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
    locale,
  } = props;

  const { showPredefinedRanges, showStartEndDates } = props.displayOptions || {};
  const { startDate, endDate } = dateRange;
  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange,
    minDate,
    maxDate,
    helpers,
    handlers,
  };
  return (
    <Paper elevation={5} square sx={{ width: "fit-content" }}>
      <Grid container direction="row" wrap="nowrap" justifyContent="center" alignItems="center">
        {showPredefinedRanges && (
          <>
            <Grid>
              <DefinedRanges selectedRange={dateRange} ranges={ranges} setRange={setDateRange} />
            </Grid>
            <Divider orientation="vertical" flexItem />
          </>
        )}
        <Grid>
          {showStartEndDates && (
            <>
              <Grid container sx={{ padding: "20px 70px" }} alignItems="center">
                <Grid sx={{ flex: 1, textAlign: "center" }}>
                  <Typography variant="subtitle1">
                    {startDate ? format(startDate, "dd MMMM yyyy", { locale }) : "Start Date"}
                  </Typography>
                </Grid>
                <Grid sx={{ flex: 1, textAlign: "center" }}>
                  <ArrowRightAlt color="action" />
                </Grid>
                <Grid sx={{ flex: 1, textAlign: "center" }}>
                  <Typography variant="subtitle1">
                    {endDate ? format(endDate, "dd MMMM yyyy", { locale }) : "End Date"}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
            </>
          )}
          <Grid container direction="row" justifyContent="center" wrap="nowrap">
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
              locale={locale}
            />
            <Divider orientation="vertical" flexItem />
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
              locale={locale}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
