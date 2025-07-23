"use server";

import { signIn } from "./auth";

export async function SignInAction() {
  await signIn("google", { redirectTo: "/account" });
}
