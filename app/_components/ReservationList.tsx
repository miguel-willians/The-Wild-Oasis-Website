"use client";

import { useOptimistic } from "react";
import { Booking } from "../_types/types";
import ReservationCard from "./ReservationsCard";
import { deleteReservation } from "../_lib/actions";
import Link from "next/link";

interface ReservationListProps {
  bookings: Booking[];
}

export default function ReservationList({ bookings }: ReservationListProps) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <>
      {optimisticBookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {optimisticBookings.map((booking) => (
            <ReservationCard
              booking={booking}
              key={booking.id}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </>
  );
}
