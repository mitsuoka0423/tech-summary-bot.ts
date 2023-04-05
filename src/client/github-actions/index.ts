import { adaptor } from "../../application/adaptor/client-adaptor/driver-adaptor";

import { config } from "dotenv";
config();

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";
const DISCORD_TOKEN = process.env.DISCORD_TOKEN || "";
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID || "";
const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY || "";

adaptor({ DISCORD_WEBHOOK_URL, DISCORD_TOKEN, DISCORD_GUILD_ID, OPEN_AI_API_KEY }).then(() => {
	console.log("finished");
});
