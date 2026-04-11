import { auth } from "@clerk/nextjs/server";
import Anthropic from "@anthropic-ai/sdk";
import { DESIGN_SYSTEM_SYSTEM_PROMPT, getDesignSystemPrompt } from "@/lib/ai/prompts/design-system";

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

    const body = await req.json();
    const { productId, name, personality, audience, aesthetic } = body;

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Tab 1: Colors
          controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ step: "colors", message: "Extracting brand DNA & computing colors..." })}\n\n`));
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Tab 2: Typography
          controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ step: "typography", message: "Generating type scale based on aesthetics..." })}\n\n`));
          await new Promise(resolve => setTimeout(resolve, 800));

          // Tab 3: Spacing
          controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ step: "spacing", message: "Defining spacing primitives..." })}\n\n`));
          await new Promise(resolve => setTimeout(resolve, 800));

          // Tab 4: Components
          controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ step: "components", message: "Applying tokens to component states..." })}\n\n`));
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Finalize Event
          controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({ step: "export", message: "Finalizing Token Exports..." })}\n\n`));
          await new Promise(resolve => setTimeout(resolve, 500));

          // Mock sending back a completed structured payload!
          const mockedStructuredData = {
            colors: { success: true },
            typography: { ready: true },
            spacing: { default: "4px" },
            components: { mapped: true },
            exports: { ready: true }
          };

          controller.enqueue(encoder.encode(`event: result\ndata: ${JSON.stringify(mockedStructuredData)}\n\n`));
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
