"use server";

import { signIn, signOut } from "@/lib/auth";
import { addNewUser } from "@/lib/utils.prisma";
import bcrypt from "bcryptjs";

export async function logIn(formData: FormData) {
  await signIn("credentials", formData);
}

export async function signUp(formData: FormData) {
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10,
  );

  await addNewUser(formData.get("email") as string, hashedPassword);

  await signIn("credentials", formData);
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}
