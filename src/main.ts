import { getPrompt, postChatCompletion } from "./api/chatgpt";
import { notify } from "./api/discord";
import { getItems } from "./api/qiita";
import { ArticleSummary } from "./model/domain/articleSummary";

import { config } from "dotenv";
config();

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";
const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY || "";

export const main = async () => {
  const items = await getItems({ query: "tag:javascript", per_page: 5 });

  const summaries: ArticleSummary[] = [];
  for (const item of items) {
    const prompt = getPrompt(item.body);
    const summary = await postChatCompletion(prompt, OPEN_AI_API_KEY);
    summaries.push({ title: item.title, url: item.url, summary });
  }

  const messages: string[] = summaries
    .map(
      ({ title, url, summary }) =>
        `---\n・タイトル：${title}\n・url：${url}\n---\n${summary}`
    );
  
  for (const message of messages) {
    await notify({ webhookUrl: DISCORD_WEBHOOK_URL, content: message });
  }
};

main();
