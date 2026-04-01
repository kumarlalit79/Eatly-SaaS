import { sendMail } from "../lib/nodemailer";
import { env } from "../config/env";

export const sendPasswordResetEmail = async (
  email: string,
  name: string,
  token: string,
) => {
  const url = `${env.FRONTEND_URL}/reset-password?token=${token}`;

  const html = `
    <h2>Hello ${name}</h2>
    <p>Click below to reset your password:</p>
    <a href="${url}">${url}</a>
    <p>This link expires in 1 hour.</p>
  `;

  await sendMail(email, "Reset Password", html);
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const html = `<h2>Welcome ${name} 🎉</h2><p>Thanks for joining Eatly!</p>`;
  await sendMail(email, "Welcome to Eatly", html);
};
