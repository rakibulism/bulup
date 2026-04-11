import Anthropic from "@anthropic-ai/sdk";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const SYSTEM_PROMPT = `You are an AI assistant embedded in a visual design canvas tool called Bulup.
The user is looking at a canvas node (a screen or component in their product) and wants to make changes or generate a new related node.

Your job is to respond with a JSON object describing what should happen on the canvas.

Respond ONLY with valid JSON in this format:
{
  "action": "new_node" | "modify_node",
  "title": "string — descriptive title for the resulting node",
  "type": "web" | "mobile",
  "description": "string — short description of what this screen/component does",
  "suggestion": "string — a brief, friendly one-liner explaining what you did"
}

Rules:
- If the user says 'add', 'create', 'make', 'generate', 'new' → action = "new_node"
- If the user says 'change', 'update', 'modify', 'edit', 'refine', 'fix' → action = "modify_node"
- Keep titles concise (under 40 chars)
- Keep descriptions practical and product-focused
- Be context-aware: use the node title to understand what screen it is
`;

export async function POST(req: Request) {
  try {
    const { nodeTitle, nodeType, userPrompt } = await req.json();

    if (!userPrompt || userPrompt.trim().length < 3) {
      return new Response("Prompt is too short", { status: 400 });
    }

    const userMessage = `Current canvas node: "${nodeTitle}" (type: ${nodeType})
    
User request: ${userPrompt}

Generate the appropriate canvas action JSON.`;

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const rawContent =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Extract JSON from response
    let parsed: Record<string, unknown>;
    try {
      const firstBrace = rawContent.indexOf("{");
      const lastBrace = rawContent.lastIndexOf("}");
      const jsonStr = rawContent.substring(firstBrace, lastBrace + 1);
      parsed = JSON.parse(jsonStr);
    } catch {
      return new Response(
        JSON.stringify({ error: "AI returned invalid format" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(parsed), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Error";
    console.error("[node-refine] Error:", error);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
