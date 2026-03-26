import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  addDays,
  isSameDay,
  isWithinInterval,
  isSameMonth,
  addMonths,
  parseISO,
  isValid,
  min,
  max,
  differenceInCalendarDays,
} from "date-fns";
import type { DateRange } from "./types";

type Falsy = false | null | undefined | 0 | "";

export const identity = <T>(x: T) => x;

export const chunks = <T>(array: ReadonlyArray<T>, size: number): T[][] => {
  return size > 0
    ? Array.from({ length: Math.ceil(array.length / size) }, (_, i) => array.slice(i * size, i * size + size))
    : [[...array]];
};

// Date
export const getDaysInMonth = (date: Date, locale?: Locale) => {
  const startWeek = startOfWeek(startOfMonth(date), { locale });
  const endWeek = endOfWeek(endOfMonth(date), { locale });
  const diff = differenceInCalendarDays(endWeek, startWeek);

  const days = Array.from({ length: diff + 1 }, (_, i) => addDays(startWeek, i));

  return days;
};

export const isStartOfRange = ({ startDate }: DateRange, day: Date) =>
  startDate !== undefined && isSameDay(day, startDate);

export const isEndOfRange = ({ endDate }: DateRange, day: Date) => endDate !== undefined && isSameDay(day, endDate);

export const inDateRange = ({ startDate, endDate }: DateRange, day: Date) =>
  startDate !== undefined && endDate !== undefined && isWithinInterval(day, { start: startDate, end: endDate });

export const isRangeSameDay = ({ startDate, endDate }: DateRange) =>
  startDate !== undefined && endDate !== undefined && isSameDay(startDate, endDate);

export const parseOptionalDate = (date: Date | string | Falsy, defaultValue: Date) => {
  if (!date) return defaultValue;
  const parsed = date instanceof Date ? date : parseISO(date);

  return isValid(parsed) ? parsed : defaultValue;
};

export const getValidatedMonths = ({ startDate, endDate }: DateRange, minDate: Date, maxDate: Date) => {
  if (startDate === undefined || endDate === undefined) return [startDate, endDate];

  const newStart = max([startDate, minDate]);
  const newEnd = min([endDate, maxDate]);

  return [newStart, isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd];
};
