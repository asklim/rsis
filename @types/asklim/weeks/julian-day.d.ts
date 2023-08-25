import { DateTypes } from "../types";
/**
 * Number of Julian Day of Gregorian date at local timezone
 * ***
 * Valid from November, 23 -4713
 * или 23(25) Nov 4714г до н.э year A.D.(A.C., B.C.)
 * * 1г до н.э. = 0
 * * 2г до н.э. = -1
 * * 4714г до н.э = -4713
 */
export default function julianDay(gregorianDate: DateTypes): number;
//# sourceMappingURL=julian-day.d.ts.map