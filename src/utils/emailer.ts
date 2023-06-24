import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import config from "../config";

export let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // true for 465, false for other ports
  secure: true,
  auth: {
    user: config.stmp_email,
    pass: config.stmp_password,
  },
});

type EmailerType = {
  companyName: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
};
let emailer = async (
  { companyName, ...args }: EmailerType,
  callback?: (err: Error | null, info: SMTPTransport.SentMessageInfo) => void
) => {
  return transporter.sendMail(
    {
      ...args,
      from: ` ${companyName} <noreply@gmail.com>`,
    },
    callback!
  );
};

export default emailer;
