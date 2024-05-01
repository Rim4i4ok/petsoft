"use client";

import { createCheckoutSession } from "@/actions/stripe.actions";
import { Button } from "./ui/button";
import { useTransition } from "react";

function PaymentBtn() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={async () => {
        startTransition(async () => await createCheckoutSession());
      }}
      disabled={isPending}
    >
      Buy lifetime access for $299
    </Button>
  );
}

export default PaymentBtn;
