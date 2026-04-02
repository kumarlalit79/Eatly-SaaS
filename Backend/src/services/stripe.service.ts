import { stripe } from "../lib/stripe";
import { env } from "../config/env";
import * as subService from "./subscription.service";

export const createCheckoutSession = async (userId: string, email: string) => {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [
      {
        price: env.STRIPE_PRO_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.FRONTEND_URL}/cancel`,
    metadata: {
      userId,
    },
  });

  return session.url;
};

export const createPortalSession = async (customerId: string) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: env.FRONTEND_URL,
  });

  return session.url;
};

export const handleCheckoutSuccess = async (sessionId: string) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const userId = session.metadata?.userId;

  if (!userId) throw new Error("User not found in metadata");

  await subService.upgradeToPro(
    userId,
    session.customer as string,
    session.subscription as string
  );

  return { success: true };
};