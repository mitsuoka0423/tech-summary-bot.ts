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
	const channel = 'javascript';

	const items = await getItems({ query: `${channel}+created:>2023-03-31`, per_page: 1, sort: 'like' });

	const summaries: ArticleSummary[] = [];
	for (const item of items) {
		const prompt = getPrompt(item.body);
		const summary = await postChatCompletion(prompt, OPEN_AI_API_KEY);
		summaries.push({ title: item.title, url: item.url, summary, likesCount: item.likes_count, stocksCount: item.stocks_count, createdAt: item.created_at.toISOString() });
	}

	const messages: string[] = summaries.map(
		({ title, url, summary, likesCount, stocksCount, createdAt }) =>
			`
概要：
> タイトル：${title}
> いいね数：${likesCount}｜ストック数：${stocksCount}
> 記事　　：${url}
> 投稿日　：${createdAt}

サマリー：
${summary}
`,
	);

	for (const message of messages) {
		await notify({ webhookUrl: DISCORD_WEBHOOK_URL, content: message.trim() });
	}
};
