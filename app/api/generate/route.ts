import { NextResponse } from "next/server";
import { z } from "zod";
import { runWorkflow } from "@/lib/gemini";
import { createClient } from "@/lib/supabase/server";
import { workflowTypes } from "@/lib/workflows";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  workflow: z.enum(workflowTypes as [string, ...string[]]),
  input: z.string().trim().min(20, "Enter at least 20 characters.").max(50000, "Input is limited to 50,000 characters."),
  sourceName: z.string().trim().max(180).optional().default("Pasted text"),
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) return NextResponse.json({ error: "Sign in to run a workflow." }, { status: 401 });

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request." }, { status: 400 });

    const { workflow, input, sourceName } = parsed.data;
    const output = await runWorkflow(workflow as never, input);
    const { error: insertError } = await supabase.from("workflow_runs").insert({
      user_id: authData.user.id,
      workflow_type: workflow,
      input_name: sourceName,
      input_text: input,
      input_char_count: input.length,
      output_text: output,
    });
    if (insertError) {
      console.error("Supabase insert error:", insertError);
      throw new Error(insertError.message);
    }
    return NextResponse.json({ output });
  } catch (error) {
    console.error("Workflow generation failed:", error);
    const message = error instanceof Error && error.message.startsWith("Output generated")
      ? error.message
      : "The AI workflow could not be completed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
