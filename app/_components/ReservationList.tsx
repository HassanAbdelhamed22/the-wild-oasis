"use client";

import ReservationCard from "./ReservationCard";
import { Booking } from "../_lib/types";
import { useOptimistic } from "react";
import { deleteBooking } from "../_lib/actions";

export default function ReservationList({ bookings }: { bookings: Booking[] }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (previousBookings, bookingId) => {
      return previousBookings.filter((booking) => booking.id !== bookingId);
    },
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
