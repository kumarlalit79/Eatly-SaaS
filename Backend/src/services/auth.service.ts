import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { verifyIdToken } from "../lib/firebase";
import { sendPasswordResetEmail } from "./email.service";
import { env } from "../config/env";

const generateToken = (userId: string, email: string) => {
  return jwt.sign({ userId, email }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as string,
  } as jwt.SignOptions);
};

// Convert snake_case DB fields to camelCase for frontend
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

const getUserWithSubscription = async (userId: string) => {
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

export const signup = async (name: string, email: string, password: string) => {
  const existing = await prisma.users.findUnique({ where: { email } });
  if (existing) {
    throw new Error("Email already registered");
  }

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
  const { user: formattedUser, subscription } = await getUserWithSubscription(user.id);

  return { token, user: formattedUser, subscription };
};

export const login = async (email: string, password: string) => {
  const user = await prisma.users.findUnique({ where: { email } });

  if (!user || !user.password_hash) {
    throw new Error("Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw new Error("Invalid credentials");

  const token = generateToken(user.id, user.email);
  const { user: formattedUser, subscription } = await getUserWithSubscription(user.id);

  return { token, user: formattedUser, subscription };
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
        data: { google_id: uid, email_verified: true },
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
  const { user: formattedUser, subscription } = await getUserWithSubscription(user.id);

  return { token, user: formattedUser, subscription };
};

export const forgotPassword = async (email: string) => {
  const user = await prisma.users.findUnique({ where: { email } });

  if (!user || !user.password_hash) {
    return;
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
  return await getUserWithSubscription(userId);
};
