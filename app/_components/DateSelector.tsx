"use client";

import { isWithinInterval } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "../_context/ReservationContext";
import { BookedDates, Cabin, Settings } from "../_types/types";

interface DateSelectorProps {
  cabin: Cabin;
  settings: Settings;
  bookedDates: BookedDates;
}

function isAlreadyBooked(range: DateRange, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

export default function DateSelector({
  cabin,
  settings,
  bookedDates,
}: DateSelectorProps) {
  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;

  const { minBookingLength, maxBookingLength } = settings;

  const { range, setRange, resetRange } = useReservation();

  const handleSelect = (range: DateRange | undefined) => {
    setRange(range ?? { from: undefined, to: undefined });
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <DayPicker
        className="place-self-center"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        onSelect={handleSelect}
        selected={range}
        startMonth={new Date()}
        startDate={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 11)}
        captionLayout="dropdown"
        numberOfMonths={2}
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
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
