import { RouteHandler } from "gadget-server";
import { openAIResponseStream } from "gadget-server/ai";


/**
 * Route handler for POST diagnosis
 *
 * @type { RouteHandler } route handler - see: https://docs.gadget.dev/guides/http-routes/route-configuration#route-context
 */
const route = async ({ request, reply, api, logger, connections }) => {
  // prompt
  const prompt = `Here are some symptoms: "${request.body.quote}" and the diagnosis: "${request.body.diagnosis}". Explain the diagnosis, the symptoms connected, and the best course of action.`
  
  const stream = await connections.openai.chat.completions.create({
    model: "chatgpt-4o-latest",
    messages:[
      {
        role:"system",
        content: `You are a medical assistant AI. Your task is to provide a concise and accurate diagnosis summary based on the symptoms described by the user. Make sure to include possible conditions, severity, and suggested next steps.`
      },
      {role: 'user', prompt}
    ], 
    stream: true
  })

  await reply.send(openAIResponseStream(stream))
}

export default route;
