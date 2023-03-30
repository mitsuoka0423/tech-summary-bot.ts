import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { notify } from './discord';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  await notify();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello Notify" }),
  };
};

export { handler };
