import cors from "cors";
import express from "express";
import generateKey from "./controllers/generate-key";
import upgradeKey from "./controllers/upgrade-key";
import sendEmail from "./controllers/send-email";
import sendBulkEmail from "./controllers/send-bulk-email";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cors());

app.post("/generate-key", generateKey);
app.put('/upgrade/:apiKey', upgradeKey);
app.post('/send-email', sendEmail)
app.post('/send-bulk-email', sendBulkEmail)
export default app;
