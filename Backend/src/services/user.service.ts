import prisma from "../lib/prisma";

export const getProfile = async (userId: string) => {
  return prisma.users.findUnique({
    where: { id: userId },
    include: {
      subscriptions: {
        select: {
          plan: true,
          scans_used: true,
          scans_limit: true,
          status: true,
        },
      },
    },
  });
};

export const updateProfile = async (
  userId: string,
  data: {
    name?: string;
    avatar_url?: string;
  },
) => {
  return prisma.users.update({
    where: { id: userId },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.avatar_url && { avatar_url: data.avatar_url }),
    },
  });
};

export const completeOnBoarding = async (userId: string) => {
  return prisma.users.update({
    where: { id: userId },
    data: {
      is_onboarded: true,
    },
  });
};
