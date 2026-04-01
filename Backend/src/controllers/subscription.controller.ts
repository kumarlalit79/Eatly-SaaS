import * as service from "../services/subscription.service";

export const getSubscription = async (c: any) => {
  const userId = c.get("userId");
  const data = await service.getSubscription(userId);
  return c.json(data);
};

export const getUsage = async (c: any) => {
  const userId = c.get("userId");
  const data = await service.getUsage(userId);
  return c.json(data);
};