const { Configuration, OpenAIApi } = require("openai");

export const getPrompt = (input: string): string => {
  return `
# 役割
あなたはプロのソフトウェアエンジニアです

# 命令
以下の文章を要約してください。

# 文章

${input.substring(0, 1000)}

# 条件
- ポイントは3つ以内に絞る
- ポイントは30字程度で記載する
- 箇条書きで出力する
  `;
};

export const postChatCompletion = async (
  content: string,
  apiKey: string,
  model = "gpt-3.5-turbo"
): Promise<string> => {
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model,
    messages: [{ role: "user", content }],
  });

  return completion.data.choices[0].message.content.trim();
};
