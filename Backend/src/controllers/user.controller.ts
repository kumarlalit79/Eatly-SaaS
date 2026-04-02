import * as service from "../services/user.service";

export const getProfile = async (c: any) => {
  const userId = c.get("userId");
  const data = await service.getProfile(userId);
  return c.json(data); // already formatted in service
};

export const updateProfile = async (c: any) => {
  const userId = c.get("userId");
  const body = c.req.valid("json");
  const data = await service.updateProfile(userId, body);
  return c.json(data);
};

export const completeOnboarding = async (c: any) => {
  const userId = c.get("userId");
  const data = await service.completeOnBoarding(userId);
  return c.json(data);
};