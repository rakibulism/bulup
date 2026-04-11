/**
 * Robustly extracts and cleans a JSON string from an AI's response.
 * Handles markdown code blocks, preamble text, and trailing characters.
 */
export function cleanAIJSON(raw: string): string {
  let cleaned = raw.trim();
  
  // Remove markdown code blocks if present
  const jsonBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
  const match = cleaned.match(jsonBlockRegex);
  if (match && match[1]) {
    cleaned = match[1].trim();
  }
  
  // If there's still preamble text before the first '{', find it
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }
  
  return cleaned;
}
