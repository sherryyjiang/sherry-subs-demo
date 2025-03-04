import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // In a real app, this would connect to an actual AI model
  // For this demo, we'll simulate the response
  const result = streamText({
    model: openai("gpt-4-turbo"),
    messages,
  })

  return result.toDataStreamResponse()
}

