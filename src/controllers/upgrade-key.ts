import type { Request, Response } from "express";
import db from "../entities";
import getPlanLimits from "../utils/getPlanLimits";
import { generateKeySchema } from "./generate-key";

const upgradeKey = async (req: Request, res: Response) => {
  try {
    const { apiKey } = req.params;
    const { plan } = generateKeySchema.parse(req.body);

    const key = await db.apiKey.findOne({ where: { key: apiKey } });

    if (!key) return res.status(404).send("API key not found.");

    if (key.plan === plan) {
      return res
        .status(400)
        .send("The provided plan is the same as the current plan.");
    }

    key.plan = plan;
    key.remainingCalls = getPlanLimits(plan);
    key.totalCalls = getPlanLimits(plan);

    await db.apiKey.save(key);

    res.send(key);
  } catch (error) {
    res.status(400).send("Invalid request.");
  }
};
export default upgradeKey;
