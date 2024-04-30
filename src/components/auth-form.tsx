"use client";

import { logIn, signUp } from "@/actions/user.actions";
import AuthFormBtn from "./auth-form-btn";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFormState } from "react-dom";

type AuthFormProps = {
  type: "logIn" | "signUp";
};

function AuthForm({ type }: AuthFormProps) {
  const [logInError, dispatchLogIn] = useFormState(logIn, undefined);
  const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);

  return (
    <form action={type === "logIn" ? dispatchLogIn : dispatchSignUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" maxLength={100} required />
      </div>

      <div className="mb-4 mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          maxLength={100}
          required
        />
      </div>

      <AuthFormBtn type={type} />
      {logInError && (
        <p className="mt-2 text-sm text-red-500">{logInError.message}</p>
      )}
      {signUpError && (
        <p className="mt-2 text-sm text-red-500">{signUpError.message}</p>
      )}
    </form>
  );
}

export default AuthForm;
