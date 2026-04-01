import * as service from "../services/user.service";

export const getProfile = async (c: any) => {
  const userId = c.get("userId");
  const data = await service.getProfile(userId);
  return c.json(data);
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

/*
small note for claude brother
Right now:

completeOnboarding → always sets true

Even if frontend sends false → ignored (correct as per your requirement)
*/