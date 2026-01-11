import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { convertToModelMessages, streamText, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    /**
     * LOGIC EQUIVALENT TO YOUR PYTHON CLEAN_HISTORY:
     * The AI SDK's `convertToModelMessages` utility handles the complexity
     * of mapping roles (user/assistant) and extracting content from parts.
     */
    const result = streamText({
      model: openrouter.chat("google/gemini-2.0-flash-lite-001"),
      system: `
        You are a highly efficient System Analyst. 
        Format your output using technical, developer-first language. 
        Use markdown for code blocks and bold text for key system parameters.
      `,
      messages: await convertToModelMessages(messages),
    });

    /**
     * DATA STREAMING:
     * We use `toUIMessageStreamResponse` to ensure the metadata,
     * reasoning tokens (if applicable), and text parts are formatted
     * correctly for your frontend hook.
     */
    return result.toUIMessageStreamResponse({
      // Forwarding reasoning if using models like DeepSeek-R1 or Claude 3.7
      sendReasoning: true,
      // Example of custom error masking (similar to your try/except logic)
      onError: (error) => {
        console.error("Chat Analyst Endpoint Error:", error);
        return "Internal System Error: Analytics Engine Offline.";
      },
    });
  } catch (error) {
    console.error("Critical Runtime Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
