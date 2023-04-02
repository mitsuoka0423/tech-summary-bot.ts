import axios from "axios";

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
