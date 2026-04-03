import prisma from "../lib/prisma";


const formatUser = (user: any) => {
  const { password_hash, google_id, avatar_url, email_verified, is_onboarded, created_at, updated_at, subscriptions, ...rest } = user;
  return {
    ...rest,
    avatarUrl: avatar_url,
    emailVerified: email_verified ?? false,
    isOnboarded: is_onboarded ?? false,
    createdAt: created_at,
    updatedAt: updated_at,
  };
};

const formatSubscription = (sub: any) => {
  if (!sub) return null;
  return {
    id: sub.id,
    plan: sub.plan?.toUpperCase() || "FREE",
    status: sub.status?.toUpperCase() || "ACTIVE",
    scansUsed: sub.scans_used ?? 0,
    scansLimit: sub.scans_limit,
    currentPeriodStart: sub.current_period_start,
    currentPeriodEnd: sub.current_period_end,
  };
};

export const getProfile = async (userId: string) => {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    include: { subscriptions: true },
  });

  if (!user) throw new Error("User not found");

  const sub = user.subscriptions?.[0] || null;
  return {
    user: formatUser(user),
    subscription: formatSubscription(sub),
  };
};

export const updateProfile = async (
  userId: string,
  data: {
    name?: string;
    avatarUrl?: string;
  },
) => {
  const user = await prisma.users.update({
    where: { id: userId },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.avatarUrl && { avatar_url: data.avatarUrl }),
    },
  });

  return { user: formatUser(user) };
};

export const completeOnBoarding = async (userId: string) => {
  const user = await prisma.users.update({
    where: { id: userId },
    data: {
      is_onboarded: true,
    },
  });

  return { user: formatUser(user) };
};
