"use client";

import { logOut } from "@/actions/user.actions";
import { Button } from "./ui/button";

function SignOutBtn() {
  return <Button onClick={async () => await logOut()}>Sign out</Button>;
}

export default SignOutBtn;
