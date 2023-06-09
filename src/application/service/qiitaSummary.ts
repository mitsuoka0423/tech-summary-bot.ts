import {
	getPrompt,
	postChatCompletion,
} from "../adaptor/persistence-adaptor/chatgpt";
import { getChannels, postMessage } from "../adaptor/persistence-adaptor/discord";
import { getItems } from "../adaptor/persistence-adaptor/qiita";
import { ArticleSummary } from "../domain/ArticleSummary";

interface QiitaSummaryProps {
	DISCORD_GUILD_ID: string;
	DISCORD_TOKEN: string;
	OPEN_AI_API_KEY: string;
}

export const execute = async ({
	DISCORD_GUILD_ID,
	OPEN_AI_API_KEY,
}: QiitaSummaryProps) => {
	const channels = await getChannels(DISCORD_GUILD_ID);

	for (const channel of channels) {
		const items = await getItems({ query: `${channel.name}+created:>2023-03-31`, per_page: 3, sort: 'like' });

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
			await postMessage(message, channel.id);
		}
	}
};
