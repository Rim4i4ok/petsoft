"use server";

import { signIn, signOut } from "@/lib/auth";
import { addNewUser } from "@/lib/utils.prisma";
import { authSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";

export async function logIn(formData: unknown) {
  // check if formData is a FormData type
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  // convert formData to an object
  const formDataObject = Object.fromEntries(formData.entries());

  // validate to object
  const validatedFormDataObject = authSchema.safeParse(formDataObject);
  if (!validatedFormDataObject.success) {
    return {
      message: "Invalid form data.",
    };
  }

  await signIn("credentials", validatedFormDataObject.data);
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
