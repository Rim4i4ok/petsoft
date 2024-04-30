"use client";

import { logOut } from "@/actions/user.actions";
import { Button } from "./ui/button";
import { useTransition } from "react";

function SignOutBtn() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={async () => startTransition(async () => await logOut())}
      disabled={isPending}
    >
      Sign out
    </Button>
  );
}

export default SignOutBtn;
