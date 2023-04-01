import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { main } from "../../../src/main";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  await main();  

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello Notify" }),
  };
};

export { handler };
