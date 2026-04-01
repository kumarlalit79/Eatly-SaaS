import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { env } from "../config/env";

if (!admin.apps.length) {
  const serviceAccountPath = path.resolve(env.FIREBASE_SERVICE_ACCOUNT_PATH);

  if (!fs.existsSync(serviceAccountPath)) {
    console.warn(
      "⚠️ Firebase service account file not found at:",
      serviceAccountPath,
    );
    console.warn(
      "⚠️ Google Auth will not work. Place your firebase-service-account.json file in Backend/",
    );
  } else {
    const serviceAccount = JSON.parse(
      fs.readFileSync(serviceAccountPath, "utf-8"),
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

export const verifyIdToken = async (token: string) => {
  if (!admin.apps.length) {
    throw new Error("Firebase is not configured. Add firebase-service-account.json");
  }
  return await admin.auth().verifyIdToken(token);
};
