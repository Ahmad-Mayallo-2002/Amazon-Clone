import { createTransport } from "nodemailer";
import { config } from "dotenv";
import { generate } from "randomstring";

config();

export const sendVerificationCode = async (to: string) => {
  const transporter = createTransport({
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    service: "gmail",
  });
  const code = generate({ length: 6, charset: "hex" });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Verification Code",
    text: `This is your verification code: ${code}`,
  };
  await transporter.sendMail(mailOptions);
  return code;
};