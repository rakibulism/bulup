import { auth } from "@clerk/nextjs/server";
import Anthropic from "@anthropic-ai/sdk";
import { FLOW_SYSTEM_PROMPT, getFlowsPrompt } from "@/lib/ai/prompts/flows";

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    // const { userId } = await auth();
    const userId = "mock-user-id";
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const { architecture } = await req.json();
    if (!architecture) return new Response("Architecture required", { status: 400 });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ message: "Analyzing architecture..." })}\n\n`));

        try {
          await new Promise(resolve => setTimeout(resolve, 800));
          controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ message: "Synthesizing user journeys..." })}\n\n`));

          const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 4000,
            system: FLOW_SYSTEM_PROMPT,
            messages: [
              { role: "user", content: getFlowsPrompt(architecture) }
            ],
          });

          const content = response.content[0].type === "text" ? response.content[0].text : "";
          controller.enqueue(encoder.encode(`event: result\ndata: ${content}\n\n`));
          controller.close();
        } catch (error) {
          console.error("Flow Gen Error:", error);
          controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ message: "Failed to generate flows." })}\n\n`));
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
    return new Response("Internal Error", { status: 500 });
  }
}
