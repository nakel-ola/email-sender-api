import type { Request, Response } from "express";
import { z } from "zod";
import db from "../entities";
import emailer from "../utils/emailer";
import validateHTML from "../utils/validateHTML";

// Zod schema for sending bulk emails
const sendBulkEmailSchema = z.object({
  apiKey: z.string(),
  companyName: z.string(),
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
  subject: z.string(),
  recipients: z.array(
    z.object({
      to: z.string().email(),
    })
  ),
});
const sendBulkEmail = async (req: Request, res: Response) => {
  try {
    const { apiKey, recipients, companyName, content, subject } =
      sendBulkEmailSchema.parse(req.body);

    const { html, text } = content;

    if (html && !validateHTML(html))
      return res.status(400).send("Invalid HTML content.");

    const key = await db.apiKey.findOne({ where: { key: apiKey } });

    if (!key) return res.status(401).send("Invalid API key.");

    if (key.remainingCalls < recipients.length)
      return res.status(429).send("API limit exceeded for this month.");

    const sendEmailPromises = recipients.map(({ to }) => {
      return new Promise<void>((resolve, reject) => {
        // Send mail with defined transport object
        emailer({ companyName, to, subject, text, html }, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            reject();
          } else {
            console.log("Email sent:", info.messageId);
            key.remainingCalls--;
            resolve();
          }
        });
      });
    });

    await Promise.all(sendEmailPromises);
    db.apiKey.save(key);

    res.send("Bulk emails sent successfully!");
  } catch (error) {
    res.status(400).send("Invalid request.");
  }
};
export default sendBulkEmail;
