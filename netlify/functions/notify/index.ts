import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { execute } from "../../../src/application/service/qiitaSummary";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  await execute();  

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello Notify" }),
  };
};

export { handler };
