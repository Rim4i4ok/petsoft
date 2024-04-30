"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type AuthFormBtnProps = {
  type: "logIn" | "signUp";
};

function AuthFormBtn({ type }: AuthFormBtnProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {type === "logIn" ? "Log In" : "Sign Up"}
    </Button>
  );
}

export default AuthFormBtn;
