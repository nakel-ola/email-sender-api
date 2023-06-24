import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import db from "../entities";
import getPlanLimits from "../utils/getPlanLimits";
import { APIKey } from "./../../typing.d";

// Zod schema for API key generation
export const generateKeySchema = z.object({
  plan: z.enum(["Free", "Plus", "Pro"]).optional().default("Free"),
});

const generateKey = async (req: Request, res: Response) => {
  try {
    const { plan } = generateKeySchema.parse(req.body);

    const apiKey: APIKey = {
      id: uuidv4(),
      key: uuidv4(),
      plan,
      remainingCalls: getPlanLimits(plan),
      totalCalls: getPlanLimits(plan),
    };

    await db.apiKey.save(apiKey);

    res.send(apiKey);
  } catch (error) {
    res.status(400).send("Invalid request.");
  }
};
export default generateKey;
