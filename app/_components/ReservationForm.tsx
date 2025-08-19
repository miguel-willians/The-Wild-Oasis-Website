"use client";

import Image from "next/image";
import { Cabin, ReservationData, User } from "../_types/types";
import { useReservation } from "../_context/ReservationContext";
import { differenceInDays } from "date-fns";
import { createReservation } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

interface ReservationForm {
  cabin: Cabin;
  user: User;
}

export default function ReservationForm({ cabin, user }: ReservationForm) {
  const { range, resetRange } = useReservation();

  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights =
    startDate && endDate ? differenceInDays(startDate, endDate) : 0;

  const cabinPrice = numNights - regularPrice * discount;

  const reservationData: ReservationData = {
    startDate: startDate as Date,
    endDate: endDate as Date,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createReservationWithData = createReservation.bind(
    null,
    reservationData
  );

  const handleAction = async (formData: FormData) => {
    await createReservationWithData(formData);
    resetRange();
  };

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-4 md:px-16 py-2 flex justify-between items-center">
        <p className="text-sm md:text-base">Logged in as</p>

        <div className="flex gap-3 items-center">
          <Image
            referrerPolicy="no-referrer"
            className="rounded-full"
            src={user.image}
            alt={user.name}
            width={32}
            height={32}
          />
          <p className="text-sm md:text-base">{user.name}</p>
        </div>
      </div>

      <form
        action={handleAction}
        className="bg-primary-900 py-8 md:py-10 px-4 md:px-16 text-base md:text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-4">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-sm">Start by selecting dates</p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}
