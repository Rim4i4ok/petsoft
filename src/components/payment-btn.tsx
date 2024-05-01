"use client";

import { createCheckoutSession } from "@/actions/stripe.actions";
import { Button } from "./ui/button";

function PaymentBtn() {
  return (
    <Button
      onClick={async () => {
        await createCheckoutSession();
      }}
    >
      Buy lifetime access for $299
    </Button>
  );
}

export default PaymentBtn;
