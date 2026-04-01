import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { verifyIdToken } from "../lib/firebase";
import { sendPasswordResetEmail } from "./email.service";

const JWT_SECRET = process.env.JWT_SECRET!;

const generateToken = (userId: string, email: string) => {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "7d" });
};

export const signup = async (name: string, email: string, password: string) => {
  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      name,
      email,
      password_hash: hash,
    },
  });

  await prisma.subscriptions.create({
    data: {
      user_id: user.id,
      plan: "free",
      scans_limit: 3,
      scans_used: 0,
    },
  });

  const token = generateToken(user.id, user.email);

  return { token, user };
};

export const login = async (email: string, password: string) => {
  const user = await prisma.users.findUnique({ where: { email } });

  if (!user || !user.password_hash) {
    throw new Error("Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw new Error("Invalid credentials");

  const token = generateToken(user.id, user.email);

  return { token, user };
};

export const googleAuth = async (idToken: string) => {
  const decoded = await verifyIdToken(idToken);

  const { uid, email, name, picture } = decoded;

  let user = await prisma.users.findFirst({
    where: {
      OR: [{ google_id: uid }, { email }],
    },
  });

  if (user) {
    if (!user.google_id) {
      user = await prisma.users.update({
        where: { id: user.id },
        data: { google_id: uid },
      });
    }
  } else {
    user = await prisma.users.create({
      data: {
        name: name || "",
        email: email!,
        google_id: uid,
        avatar_url: picture,
        email_verified: true,
      },
    });

    await prisma.subscriptions.create({
      data: {
        user_id: user.id,
        plan: "free",
        scans_limit: 3,
        scans_used: 0,
      },
    });
  }

  const token = generateToken(user.id, user.email);

  return { token, user };
};

export const forgotPassword = async (email: string) => {
  const user = await prisma.users.findUnique({ where: { email } });

  if (!user || !user.password_hash) {
    throw new Error("User not eligible");
  }

  await prisma.password_reset_tokens.updateMany({
    where: { user_id: user.id, used_at: null },
    data: { used_at: new Date() },
  });

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hash = crypto.createHash("sha256").update(rawToken).digest("hex");

  await prisma.password_reset_tokens.create({
    data: {
      user_id: user.id,
      token_hash: hash,
      expires_at: new Date(Date.now() + 3600000),
    },
  });

  await sendPasswordResetEmail(user.email, user.name, rawToken);
};

export const resetPassword = async (token: string, newPassword: string) => {
  const hash = crypto.createHash("sha256").update(token).digest("hex");

  const record = await prisma.password_reset_tokens.findUnique({
    where: { token_hash: hash },
  });

  if (!record || record.used_at || record.expires_at < new Date()) {
    throw new Error("Invalid or expired token");
  }

  const newHash = await bcrypt.hash(newPassword, 10);

  await prisma.users.update({
    where: { id: record.user_id },
    data: { password_hash: newHash },
  });

  await prisma.password_reset_tokens.update({
    where: { id: record.id },
    data: { used_at: new Date() },
  });
};

export const getMe = async (userId: string) => {
  return prisma.users.findUnique({
    where: { id: userId },
    include: {
      subscriptions: true,
    },
  });
};
