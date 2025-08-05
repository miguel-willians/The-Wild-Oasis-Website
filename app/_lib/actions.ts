"use server";

import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

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

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function SignInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function SignOutAction() {
  await signOut({ redirectTo: "/" });
}
