import {
  chunks,
  getDaysInMonth,
  getValidatedMonths,
  inDateRange,
  isEndOfRange,
  isRangeSameDay,
  isStartOfRange,
  parseOptionalDate,
} from "../utils";

describe(chunks.name, () => {
  it("should split an array into chunks of the specified size", () => {
    expect(chunks([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunks([1, 2, 3, 4], 3)).toEqual([[1, 2, 3], [4]]);
    expect(chunks([], 2)).toEqual([]);
    expect(chunks([1], 1)).toEqual([[1]]);
    expect(chunks([1, 2], 5)).toEqual([[1, 2]]);
    expect(chunks([1, 2, 3, 4, 5], 0)).toEqual([[1, 2, 3, 4, 5]]); // Edge case: size 0 should return the whole array as one chunk
  });
});

describe(getDaysInMonth.name, () => {
  it("should return all days in the month, including leading and trailing days to fill the weeks", () => {
    const days = getDaysInMonth(new Date(2026, 2), {
      code: "ru-RU",
      options: { weekStartsOn: 1 },
    }); // March 2026

    expect(days.length).toBe(42); // 6 weeks * 7 days
    expect(days[0].getDate()).toBe(23); // February 23, 2026
    expect(days[6].getDate()).toBe(1); // March 1, 2026
    expect(days[30].getDate()).toBe(25); // March 25, 2026
    expect(days[37].getDate()).toBe(1); // April 1, 2026
    expect(days[days.length - 1].getDate()).toBe(5); // April 5, 2026
  });
});

describe(isStartOfRange.name, () => {
  it("should return true if the day is the start of the range", () => {
    const range = { startDate: new Date(2021, 0, 1), endDate: new Date(2021, 0, 10) };
    expect(isStartOfRange(range, new Date(2021, 0, 1))).toBe(true);
  });
  it("should return false if the day is not the start of the range", () => {
    const range = { startDate: new Date(2021, 0, 1), endDate: new Date(2021, 0, 10) };
    expect(isStartOfRange(range, new Date(2021, 0, 2))).toBe(false);
    expect(isStartOfRange(range, new Date(2021, 0, 10))).toBe(false);
  });
  it("should return false if the range has no start date", () => {
    const range = {};
    expect(isStartOfRange(range, new Date(2021, 0, 1))).toBe(false);
  });
});

describe(isEndOfRange.name, () => {
  it("should return true if the day is the end of the range", () => {
    const range = { startDate: new Date(2021, 0, 1), endDate: new Date(2021, 0, 10) };
    expect(isEndOfRange(range, new Date(2021, 0, 10))).toBe(true);
  });
  it("should return false if the day is not the end of the range", () => {
    const range = { startDate: new Date(2021, 0, 1), endDate: new Date(2021, 0, 10) };
    expect(isEndOfRange(range, new Date(2021, 0, 2))).toBe(false);
    expect(isEndOfRange(range, new Date(2021, 0, 1))).toBe(false);
  });
  it("should return false if the range has no end date", () => {
    const range = {};
    expect(isEndOfRange(range, new Date(2021, 0, 10))).toBe(false);
  });
});

describe(isRangeSameDay.name, () => {
  it("should return true if the start and end dates are the same day", () => {
    const range = { startDate: new Date(2021, 0, 1), endDate: new Date(2021, 0, 1) };
    expect(isRangeSameDay(range)).toBe(true);
  });
  it("should return false if the start and end dates are different days", () => {
    const range = { startDate: new Date(2021, 0, 1), endDate: new Date(2021, 0, 2) };
    expect(isRangeSameDay(range)).toBe(false);
  });
  it("should return false if the range has no start or end date", () => {
    const range = {};
    expect(isRangeSameDay(range)).toBe(false);
  });
});

describe(inDateRange.name, () => {
  it("should return true if the day is within the range", () => {
    const range = { startDate: new Date(2021, 0, 1), endDate: new Date(2021, 0, 10) };
    expect(inDateRange(range, new Date(2021, 0, 5))).toBe(true);
    expect(inDateRange(range, new Date(2021, 0, 1))).toBe(true); // Start date
    expect(inDateRange(range, new Date(2021, 0, 10))).toBe(true); // End date
  });
  it("should return false if the day is outside the range", () => {
    const range = { startDate: new Date(2021, 0, 1), endDate: new Date(2021, 0, 10) };
    expect(inDateRange(range, new Date(2020, 11, 31))).toBe(false);
    expect(inDateRange(range, new Date(2021, 0, 11))).toBe(false);
  });
  it("should return false if the range has no start or end date", () => {
    const range = {};
    expect(inDateRange(range, new Date(2021, 0, 5))).toBe(false);
  });
});

describe(parseOptionalDate.name, () => {
  it("should return the parsed date if a valid date string is provided", () => {
    expect(parseOptionalDate("2021-01-01", new Date())).toEqual(new Date(2021, 0, 1));
  });
  it("should return the provided date if a Date object is provided", () => {
    const date = new Date(2021, 0, 1);
    expect(parseOptionalDate(date, new Date())).toEqual(date);
  });
  it("should return the default value if an invalid date string is provided", () => {
    const defaultValue = new Date(2021, 0, 1);
    expect(parseOptionalDate("invalid-date", defaultValue)).toEqual(defaultValue);
  });
  it("should return the default value if a falsy value is provided", () => {
    const defaultValue = new Date(2021, 0, 1);
    expect(parseOptionalDate(null, defaultValue)).toEqual(defaultValue);
    expect(parseOptionalDate(undefined, defaultValue)).toEqual(defaultValue);
    expect(parseOptionalDate(false, defaultValue)).toEqual(defaultValue);
    expect(parseOptionalDate(0, defaultValue)).toEqual(defaultValue);
    expect(parseOptionalDate("", defaultValue)).toEqual(defaultValue);
  });
});

describe(getValidatedMonths.name, () => {
  it("should return the validated start and end months based on the provided range and min/max dates", () => {
    const minDate = new Date(2021, 0, 1);
    const maxDate = new Date(2021, 11, 31);

    // Valid range within min/max
    expect(
      getValidatedMonths({ startDate: new Date(2021, 2, 1), endDate: new Date(2021, 4, 30) }, minDate, maxDate),
    ).toEqual([new Date(2021, 2, 1), new Date(2021, 4, 30)]);

    // Start date before minDate
    expect(
      getValidatedMonths({ startDate: new Date(2020, 11, 1), endDate: new Date(2021, 4, 30) }, minDate, maxDate),
    ).toEqual([minDate, new Date(2021, 4, 30)]);

    // End date after maxDate
    expect(
      getValidatedMonths({ startDate: new Date(2021, 2, 1), endDate: new Date(2022, 0, 31) }, minDate, maxDate),
    ).toEqual([new Date(2021, 2, 1), maxDate]);

    expect(getValidatedMonths({ startDate: undefined, endDate: new Date(2021, 4, 30) }, minDate, maxDate)).toEqual([
      undefined,
      new Date(2021, 4, 30),
    ]);
    expect(getValidatedMonths({ startDate: new Date(2021, 2, 1), endDate: undefined }, minDate, maxDate)).toEqual([
      new Date(2021, 2, 1),
      undefined,
    ]);
    expect(getValidatedMonths({}, minDate, maxDate)).toEqual([undefined, undefined]);
  });
});
