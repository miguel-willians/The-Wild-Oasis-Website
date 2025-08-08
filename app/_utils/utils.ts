import { isWithinInterval } from "date-fns";
import { DateRange } from "react-day-picker";

export default function isAlreadyBooked(range: DateRange, datesArr: Date[]) {
  if (!range.from || !range.to) return false;
  return datesArr.some((date: Date) =>
    isWithinInterval(date, { start: range.from!, end: range.to! })
  );
}