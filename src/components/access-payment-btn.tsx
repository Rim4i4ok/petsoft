"use client";

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function AccessPaymentBtn() {
  const { update } = useSession();
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        await update(true);
        router.push("/app/dashboard");
      }}
    >
      Access PetSoft
    </Button>
  );
}

export default AccessPaymentBtn;
