import { auth } from "@clerk/nextjs/server";
import Anthropic from "@anthropic-ai/sdk";
import { ARCHITECTURE_SYSTEM_PROMPT, getArchitecturePrompt } from "@/lib/ai/prompts/architecture";

// Use edge runtime for streaming support and lower latency
export const maxDuration = 60;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { brief } = await req.json();
    if (!brief || brief.length < 10) {
      return new Response("Brief is too short", { status: 400 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // 1. Send initial progress event
        controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ message: "Understanding your idea..." })}\n\n`));

        try {
          // Delay briefly to show "progress" steps for better UX
          await new Promise(resolve => setTimeout(resolve, 1000));
          controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ message: "Defining user roles..." })}\n\n`));
          
          await new Promise(resolve => setTimeout(resolve, 800));
          controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ message: "Mapping core features..." })}\n\n`));

          await new Promise(resolve => setTimeout(resolve, 800));
          controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ message: "Building your architecture..." })}\n\n`));

          // 2. Call Anthropic
          const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 4000,
            system: ARCHITECTURE_SYSTEM_PROMPT,
            messages: [
              { role: "user", content: getArchitecturePrompt(brief) }
            ],
          });

          // 3. Extract content
          const content = response.content[0].type === "text" ? response.content[0].text : "";
          
          // 4. Send the result
          controller.enqueue(encoder.encode(`event: result\ndata: ${content}\n\n`));
          
          controller.close();
        } catch (error) {
          console.error("AI Generation Error:", error);
          controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ message: "AI failed to generate architecture." })}\n\n`));
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
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
