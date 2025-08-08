"use client";

import { differenceInDays, isPast, isSameDay } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "../_context/ReservationContext";
import { BookedDates, Cabin, Settings } from "../_types/types";
import isAlreadyBooked from "../_utils/utils";

interface DateSelectorProps {
  cabin: Cabin;
  settings: Settings;
  bookedDates: BookedDates;
}

export default function DateSelector({
  cabin,
  settings,
  bookedDates,
}: DateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();

  const emptyRange: DateRange = { from: undefined, to: undefined };
  const displayRange: DateRange = isAlreadyBooked(range, bookedDates)
    ? emptyRange
    : range;

  const { regularPrice, discount } = cabin;
  const { minBookingLength, maxBookingLength } = settings;

  const numNights =
    displayRange.from && displayRange.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;

  const cabinPrice = numNights * (regularPrice - discount);

  const handleSelect = (selectedRange: DateRange | undefined) => {
    setRange(selectedRange ?? emptyRange);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <DayPicker
        className="place-self-center"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        onSelect={handleSelect}
        selected={displayRange}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 11)}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date: Date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span>/night</span>
          </p>
          {numNights > 0 && (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          )}
        </div>

        {(range.from || range.to) && (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold cursor-pointer"
            onClick={resetRange}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
