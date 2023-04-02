import {
	getPrompt,
	postChatCompletion,
} from "../adaptor/persistence-adaptor/chatgpt";
import { notify } from "../adaptor/persistence-adaptor/discord";
import { getItems } from "../adaptor/persistence-adaptor/qiita";
import { ArticleSummary } from "../domain/ArticleSummary";

interface QiitaSummaryProps {
	DISCORD_WEBHOOK_URL: string;
	OPEN_AI_API_KEY: string;
}

export const execute = async ({
	DISCORD_WEBHOOK_URL,
	OPEN_AI_API_KEY,
}: QiitaSummaryProps) => {
	const items = await getItems({ query: "tag:javascript", per_page: 5 });

	const summaries: ArticleSummary[] = [];
	for (const item of items) {
		const prompt = getPrompt(item.body);
		const summary = await postChatCompletion(prompt, OPEN_AI_API_KEY);
		summaries.push({ title: item.title, url: item.url, summary });
	}

	const messages: string[] = summaries.map(
		({ title, url, summary }) =>
			`---\n・タイトル：${title}\n・url：${url}\n---\n${summary}`,
	);

	for (const message of messages) {
		await notify({ webhookUrl: DISCORD_WEBHOOK_URL, content: message });
	}
};
