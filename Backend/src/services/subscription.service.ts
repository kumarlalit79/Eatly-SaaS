import prisma from "../lib/prisma";

export const getSubscription = async (userId: string) => {
  return prisma.subscriptions.findFirst({
    where: { user_id: userId },
  });
};

export const getUsage = async (userId: string) => {
  const sub = await prisma.subscriptions.findFirst({
    where: { user_id: userId },
  });

  if (!sub) {
    throw new Error("Subscription not found");
  }

  const isUnlimited = sub.scans_limit === null;

  return {
    scansUsed: sub.scans_used,
    scansLimit: sub.scans_limit,
    remaining: isUnlimited ? null : sub.scans_limit! - sub.scans_used,
    isUnlimited,
  };
};

export const checkScanLimit = async (userId: string) => {
  const sub = await prisma.subscriptions.findFirst({
    where: { user_id: userId },
  });

  if (!sub) throw new Error("Subscription not found");

  if (sub.scans_limit === null) {
    return { allowed: true };
  }

  return {
    allowed: sub.scans_used < sub.scans_limit,
  };
};

export const incrementScanCount = async (userId: string) => {
  await prisma.subscriptions.updateMany({
    where: { user_id: userId },
    data: {
      scans_used: { increment: 1 },
    },
  });
};

export const upgradeToPro = async (
  userId: string,
  stripeCustomerId: string,
  stripeSubscriptionId: string
) => {
  return prisma.subscriptions.updateMany({
    where: { user_id: userId },
    data: {
      plan: "pro",
      status: "active",
      scans_limit: null,
      stripe_customer_id: stripeCustomerId,
      stripe_subscription_id: stripeSubscriptionId,
    },
  });
};