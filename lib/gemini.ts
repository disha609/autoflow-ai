import { GoogleGenAI } from "@google/genai";
import { workflowDefinitions, type WorkflowType } from "@/lib/workflows";

export async function runWorkflow(type: WorkflowType, input: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Gemini API key is not configured.");

  const ai = new GoogleGenAI({ apiKey });
  const workflow = workflowDefinitions[type];
  const result = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
    contents: `${workflow.prompt}

--- SOURCE TEXT ---
${input}`,
    config: {
      temperature: type === "json" ? 0.1 : 0.3,
      maxOutputTokens: 4096,
      ...(type === "json" ? { responseMimeType: "application/json" } : {}),
    },
  });

  const output = result.text?.trim();
  if (!output) throw new Error("The AI service returned an empty response.");
  return output;
}
