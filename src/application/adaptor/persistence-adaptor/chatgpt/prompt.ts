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
