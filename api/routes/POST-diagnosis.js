import { RouteHandler } from "gadget-server";
import { openAIResponseStream } from "gadget-server/ai";


/**
 * Route handler for POST diagnosis
 *
 * @type { RouteHandler } route handler - see: https://docs.gadget.dev/guides/http-routes/route-configuration#route-context
 */
const route = async ({ request, reply, api, logger, connections }) => {
  // prompt
  const prompt = `Here are some symptoms: "${request.body.textInput}". The potential diagnosis is "${request.body.prediction}". Explain the diagnosis, the symptoms connected, and what to do next. Do not style the text.`
  logger.info('prompt:',prompt)
  logger.info('request:',request.body.symptoms, request.body.textInput)
  const stream = await connections.openai.chat.completions.create({
    model: "chatgpt-4o-latest",
    messages:[
      {
        role:"system",
        content: `You are a medical assistant AI. Your task is to provide a concise and accurate diagnosis summary based on the symptoms described by the user. Make sure to include possible conditions, severity, and suggested next steps.`
      },  
      {role: 'user', content:prompt}
    ], 
    stream: true
  })
  logger.info('Streamed!')

  await reply.send(openAIResponseStream(stream))
}

export default route;
