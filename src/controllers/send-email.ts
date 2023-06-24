import type { Request, Response } from "express";
import { z } from "zod";
import db from "../entities";
import emailer from "../utils/emailer";
import validateHTML from "../utils/validateHTML";

// Zod schema for sending an email
export const sendEmailSchema = z.object({
  companyName: z.string(),
  apiKey: z.string(),
  to: z.string().email(),
  subject: z.string(),
  content: z.union([
    z.object({
      text: z.string(),
      html: z.string().optional(),
    }),
    z.object({
      text: z.string().optional(),
      html: z.string(),
    }),
  ]),
});

const sendEmail = async (req: Request, res: Response) => {
  try {
    const { apiKey, to, subject, content, companyName } = sendEmailSchema.parse(
      req.body
    );

    const { html, text } = content;

    if (html && !validateHTML(html))
      return res.status(400).send("Invalid HTML content.");

    const key = await db.apiKey.findOne({ where: { key: apiKey } });

    if (!key) return res.status(401).send("Invalid API key.");

    if (key.remainingCalls <= 0)
      return res.status(429).send("API limit exceeded for this month.");

    emailer({ companyName, to, subject, text, html }, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Failed to send email.");
      } else {
        console.log("Email sent:", info.messageId);
        key.remainingCalls--;
        db.apiKey.save(key);
        res.send("Email sent successfully!");
      }
    });
  } catch (error) {
    res.status(400).send("Invalid request.");
  }
};

export default sendEmail;
