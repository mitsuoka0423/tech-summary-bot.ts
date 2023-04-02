import { execute } from "../../../service/qiitaSummary";

export const adaptor = async () => {
  const result = await execute();
  return result;
};
