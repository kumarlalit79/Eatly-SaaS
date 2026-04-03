import * as service from "../services/subscription.service";
import * as stripeService from "../services/stripe.service";
import prisma from "../lib/prisma";
import { toCamelCase } from "../lib/camelCase";

export const getSubscription = async (c: any) => {
  const userId = c.get("userId");
  const data = await service.getSubscription(userId);
  return c.json({ subscription: toCamelCase(data) });
};

export const getUsage = async (c: any) => {
  const userId = c.get("userId");
  const data = await service.getUsage(userId);
  return c.json(data); 
};

export const createCheckout = async (c: any) => {
  const user = c.get("user");
  const url = await stripeService.createCheckoutSession(user.id, user.email);
  return c.json({ url });
};

export const createPortal = async (c: any) => {
  const sub = await prisma.subscriptions.findFirst({
    where: { user_id: c.get("userId") },
  });

  if (!sub?.stripe_customer_id) {
    return c.json({ error: "No billing account found" }, 400);
  }

  const url = await stripeService.createPortalSession(sub.stripe_customer_id);
  return c.json({ url });
};

export const checkoutSuccess = async (c: any) => {
  const sessionId = c.req.query("session_id");

  if (!sessionId) {
    return c.json({ error: "session_id required" }, 400);
  }

  const result = await stripeService.handleCheckoutSuccess(sessionId);
  
  
  const userId = c.get("userId");
  const subscription = await service.getSubscription(userId);

  return c.json({
    success: true,
    subscription: toCamelCase(subscription),
  });
};