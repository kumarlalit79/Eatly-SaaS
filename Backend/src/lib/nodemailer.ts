import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT, -- check if, are they needed or not.
service: "gmail",
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: `"Eatly" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
  });
};
