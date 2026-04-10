import { auth } from "@clerk/nextjs/server";
import Anthropic from "@anthropic-ai/sdk";
import { DESIGN_SYSTEM_SYSTEM_PROMPT, getDesignSystemPrompt } from "@/lib/ai/prompts/design-system";

export const maxDuration = 60;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { productId, name, personality, audience, aesthetic } = body;

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ message: "Extracting brand DNA..." })}\n\n`));

        try {
          await new Promise(resolve => setTimeout(resolve, 800));
          controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ message: "Generating color system..." })}\n\n`));

          await new Promise(resolve => setTimeout(resolve, 800));
          controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ message: "Scaling spacing & type..." })}\n\n`));

          const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 4000,
            system: DESIGN_SYSTEM_SYSTEM_PROMPT,
            messages: [
              { role: "user", content: getDesignSystemPrompt({ name, personality, audience, aesthetic }) }
            ],
          });

          const content = response.content[0].type === "text" ? response.content[0].text : "";
          controller.enqueue(encoder.encode(`event: result\ndata: ${content}\n\n`));
          controller.close();
        } catch (error) {
          controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ message: "Design generation failed." })}\n\n`));
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
