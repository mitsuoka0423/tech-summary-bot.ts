import { adaptor } from "../../application/adaptor/client-adaptor/driver-adaptor";

import { config } from "dotenv";
config();

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";
const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY || "";

adaptor({ DISCORD_WEBHOOK_URL, OPEN_AI_API_KEY }).then(() =>
  console.log("finished")
);
