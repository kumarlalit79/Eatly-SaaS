import * as service from "../services/auth.service";

export const signup = async (c: any) => {
  const { name, email, password } = c.req.valid("json");
  const data = await service.signup(name, email, password);
  return c.json(data);
};

export const login = async (c: any) => {
  const { email, password } = c.req.valid("json");
  const data = await service.login(email, password);
  return c.json(data);
};

export const googleAuth = async (c: any) => {
  const { idToken } = c.req.valid("json");
  const data = await service.googleAuth(idToken);
  return c.json(data);
};

export const forgotPassword = async (c: any) => {
  const { email } = c.req.valid("json");
  await service.forgotPassword(email);
  return c.json({ message: "Email sent" });
};

export const resetPassword = async (c: any) => {
  const { token, newPassword } = c.req.valid("json");
  await service.resetPassword(token, newPassword);
  return c.json({ message: "Password updated" });
};

export const getMe = async (c: any) => {
  const userId = c.get("userId");
  const data = await service.getMe(userId);
  return c.json(data);
};