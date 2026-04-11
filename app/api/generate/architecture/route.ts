import Anthropic from "@anthropic-ai/sdk";
import { ARCHITECTURE_SYSTEM_PROMPT, getArchitecturePrompt } from "@/lib/ai/prompts/architecture";
import { cleanAIJSON } from "@/lib/ai/utils";

// Use edge runtime for streaming support and lower latency
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const userId = "mock-user-id"; // Authentication bypassed as requested

    const { brief } = await req.json();
    if (!brief || brief.length < 10) {
      return new Response("Brief is too short", { status: 400 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // 1. Initial progress
          controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ message: "Understanding your idea..." })}\n\n`));
          await new Promise(resolve => setTimeout(resolve, 800));
          
          controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ message: "Defining user roles..." })}\n\n`));
          await new Promise(resolve => setTimeout(resolve, 800));
          
          controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ message: "Mapping core features..." })}\n\n`));
          await new Promise(resolve => setTimeout(resolve, 800));

          controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ message: "Scoping your MVP..." })}\n\n`));
          await new Promise(resolve => setTimeout(resolve, 800));

          controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ message: "Building your architecture..." })}\n\n`));

          // 2. Call Anthropic with error handling
          console.log("[API] Calling Anthropic for architecture...");
          const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 4000,
            system: ARCHITECTURE_SYSTEM_PROMPT,
            messages: [
              { role: "user", content: getArchitecturePrompt(brief) }
            ],
          }).catch(err => {
            console.error("[API] Anthropic SDK Error:", err);
            throw err;
          });

          // 3. Extract and Clean Content
          const rawContent = response.content[0].type === "text" ? response.content[0].text : "";
          const cleanedContent = cleanAIJSON(rawContent);
          
          if (!cleanedContent || !cleanedContent.startsWith('{')) {
            console.error("[API] Invalid JSON output from AI:", rawContent);
            throw new Error("AI returned malformed JSON");
          }
          
          // 4. Send the result (minified to ensure stable SSE delivery)
          const resultData = JSON.parse(cleanedContent);
          controller.enqueue(encoder.encode(`event: result\ndata: ${JSON.stringify(resultData)}\n\n`));
          
          controller.close();
        } catch (error: any) {
          console.error("[API] Generation Flow Error:", error);
          const errorMessage = error.message || "AI failed to generate architecture.";
          controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ message: errorMessage })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("[API] Fatal API Route Error:", error);
    return new Response(error.message || "Internal Server Error", { status: 500 });
  }
}
