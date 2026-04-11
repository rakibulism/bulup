// import { auth } from "@clerk/nextjs/server";
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
            colors: {
              primitive: [
                { name: "Brand 500", hex: "#6E63F5" },
                { name: "Neutral 900", hex: "#111111" },
                { name: "Success 500", hex: "#22C55E" },
                { name: "Error 500", hex: "#EF4444" }
              ],
              semantic: [
                { name: "bg-base", map: "Neutral 950", hex: "#0C0C0C" },
                { name: "brand-default", map: "Brand 500", hex: "#6E63F5" },
                { name: "text-primary", map: "Neutral 50", hex: "#F0F0F0" }
              ]
            },
            typography: [
              { label: "Display 2xl", token: "--text-display-2xl", size: "48px", weight: "700", line: "1.1" },
              { label: "Heading xl", token: "--text-heading-xl", size: "28px", weight: "600", line: "1.2" },
              { label: "Body md", token: "--text-body-md", size: "15px", weight: "400", line: "1.6" },
              { label: "Label sm", token: "--text-label-sm", size: "12px", weight: "500", line: "1.4" }
            ],
            spacing: [
              { token: "--space-1", value: "4px" },
              { token: "--space-4", value: "16px" },
              { token: "--space-8", value: "32px" },
              { token: "--space-12", value: "48px" },
              { token: "--space-24", value: "96px" }
            ],
            components: {
              button: { radius: "8px", font: "--text-body-md" },
              input: { radius: "6px", font: "--text-label-md" }
            }
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
