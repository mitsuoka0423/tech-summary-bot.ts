import axios from "axios";
import { Client } from "discord.js";

// TODO: 環境変数参照を別ファイルに移す
import { config } from "dotenv";
config();

const client = new Client({
  intents: ["Guilds", "GuildMessages"],
});

const login = async () => {
	await client.login(process.env.DISCORD_TOKEN);
};

export const notify = async ({
  webhookUrl,
  content,
}: {
  webhookUrl: string;
  content: string;
}) => {
  await axios.post(webhookUrl, {
    content,
  });
};

export const getChannels = async (guildId: string) => {
	await login();

  const guilds = client.guilds.cache.get(guildId);
  if (!guilds) {
    throw new Error(`Guild not found: Guild ID is ${guildId}`);
  }

  const channels = await guilds.channels.fetch().then((channels) => {
    return channels
      .filter((channel) => channel?.parent?.name === "tech-summary")
      .map((channel) => {
        return {
          id: channel?.id || '',
          name: channel?.name || '',
          category: channel?.parent?.name || '',
        };
      });
  });
  
	return channels;
};

export const postMessage = async (message: string, channelId: string) => {
	if (!message) {
		throw new Error("Message is required");
	}

	if (!channelId) {
		throw new Error("Channel ID is required");
	}

	await login();

	const channel = await client.channels.fetch(channelId);
	if (!channel) {
		throw new Error(`Channel not found: Channel ID is ${channelId}`);
	}

	if (channel.isTextBased()) {
		await channel.send(message);
	}
};
