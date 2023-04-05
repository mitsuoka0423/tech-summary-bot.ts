import { execute } from "../../../service/qiitaSummary";

interface DriverAdaptorProps {
	DISCORD_WEBHOOK_URL: string;
	DISCORD_GUILD_ID: string;
	DISCORD_TOKEN: string;
	OPEN_AI_API_KEY: string;
}

export const adaptor = async (props: DriverAdaptorProps) => {
	const result = await execute(props);
	return result;
};
