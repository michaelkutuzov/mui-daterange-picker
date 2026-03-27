import type { SelectChangeEvent } from "@mui/material";
import { FormControl, Grid, IconButton, MenuItem, Select } from "@mui/material";
import React from "react";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { getMonth, getYear, setMonth, setYear } from "date-fns";

export interface HeaderProps {
  date: Date;
  // eslint-disable-next-line no-unused-vars
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
  locale?: Locale;
}

const generateYears = (relativeTo: Date, count: number) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((_y, i) => relativeTo.getFullYear() - half + i);
};

export const Header: React.FunctionComponent<HeaderProps> = ({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
  locale,
}: HeaderProps) => {
  const MONTHS =
    typeof locale !== "undefined"
      ? [...Array(12).keys()].map((d) => locale.localize?.month(d, { width: "abbreviated", context: "standalone" }))
      : ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    console.log("month change", event.target.value);
    setDate(setMonth(date, event.target.value));
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    console.log("year change", event.target.value);
    setDate(setYear(date, event.target.value));
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid sx={{ padding: "5px" }}>
        <IconButton
          sx={{ padding: "10px", "&:hover": { background: "none" } }}
          disabled={prevDisabled}
          onClick={onClickPrevious}
        >
          <ChevronLeft color={prevDisabled ? "disabled" : "action"} />
        </IconButton>
      </Grid>
      <Grid>
        <FormControl variant="standard">
          <Select value={getMonth(date)} onChange={handleMonthChange} MenuProps={{ disablePortal: true }}>
            {MONTHS.map((month, idx) => (
              <MenuItem key={month} value={idx}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid>
        <FormControl variant="standard">
          <Select value={getYear(date)} onChange={handleYearChange} MenuProps={{ disablePortal: true }}>
            {generateYears(date, 30).map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid sx={{ padding: "5px" }}>
        <IconButton
          sx={{ padding: "10px", "&:hover": { background: "none" } }}
          disabled={nextDisabled}
          onClick={onClickNext}
        >
          <ChevronRight color={nextDisabled ? "disabled" : "action"} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
