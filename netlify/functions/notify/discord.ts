import axios from 'axios';

export const notify = async () => {
  await axios.post(process.env.DISCORD_WEBHOOK_URL, {
    content: "hello!"
  });
};
