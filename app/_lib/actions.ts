"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";
import { getBookings } from "./data-service";

export default async function UpdateGuestProfile(formData: FormData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(String(nationalID))) {
    throw new Error("Please provide a valid national ID");
  }

  const [nationality, countryFlag] = String(formData.get("nationality")).split(
    "%"
  );

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
  redirect("/account/profile");
}

export async function deleteReservation(bookingId: number) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const guestReservations = await getBookings(session.user.guestId);

  const guestReservationsIds = guestReservations.map(
    (reservation) => reservation.id
  );

  if (!guestReservationsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this reservation");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Reservation could not be deleted");

  revalidatePath("/account/reservations");
}

export async function UpdateReservation(formData: FormData) {
  console.log(formData);

  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const guestReservations = await getBookings(session.user.guestId);

  const guestReservationsIds = guestReservations.map(
    (reservation) => reservation.id
  );

  const bookingId = Number(formData.get("id"));

  if (!guestReservationsIds.includes(bookingId))
    throw new Error("You are not allowed to edit this reservation");

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");

  const updateData = {
    id: bookingId,
    numGuests,
    observations,
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Reservation could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}

export async function SignInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function SignOutAction() {
  await signOut({ redirectTo: "/" });
}
