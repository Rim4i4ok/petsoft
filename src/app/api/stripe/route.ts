import { updateUserAccess } from "@/lib/utils.prisma";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const body = await request.text();

  // verify webhook came from stripe
  let event;
  try {
    const signature = request.headers.get("stripe-signature");
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    // On error, log and return the error message
    console.error("❌ Webhooks verification failed:", error);
    return Response.json(null, { status: 400 });
  }

  // fulfill order
  switch (event.type) {
    case "checkout.session.completed":
      await updateUserAccess(event.data.object.customer_email);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // return 200 OK
  return Response.json(null, { status: 200 });
}
