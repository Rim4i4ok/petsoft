"use server";

import { signIn, signOut } from "@/lib/auth";
import { addNewUser } from "@/lib/utils.prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function logIn(formData: unknown) {
  // check if formData is a FormData type
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  await signIn("credentials", formData);

  redirect("/app/dashboard");
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
