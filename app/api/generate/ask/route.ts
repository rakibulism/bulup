import { auth } from "@clerk/nextjs/server";
import Anthropic from "@anthropic-ai/sdk";
import { BRAIN_SYSTEM_PROMPT, getBrainPrompt } from "@/lib/ai/prompts/brain";
import { prisma } from "@/lib/db/prisma";

export const maxDuration = 60;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const { productId, question } = await req.json();
    if (!productId || !question) return new Response("Missing params", { status: 400 });

    // Fetch full product context
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        flows: true,
        designSystem: true,
      }
    });

    if (!product) return new Response("Product not found", { status: 404 });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 2000,
            system: BRAIN_SYSTEM_PROMPT,
            messages: [
              { role: "user", content: getBrainPrompt(question, product) }
            ],
            stream: true,
          });

          for await (const chunk of response) {
            if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
          controller.close();
        } catch (error) {
          console.error("Brain Ask Error:", error);
          controller.enqueue(encoder.encode("Failed to retrieve information from product memory."));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    return new Response("Internal Error", { status: 500 });
  }
}
