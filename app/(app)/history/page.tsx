import type { Metadata } from "next";
import { HistoryList } from "@/components/history-list";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "History" };

export default async function HistoryPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: runs = [] } = await supabase.from("workflow_runs").select("id, workflow_type, input_name, output_text, input_char_count, created_at").order("created_at", { ascending: false }).limit(50);
  return (
    <>
      <div className="mb-8"><p className="text-sm font-medium text-indigo-300">Saved outputs</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">History</h1><p className="mt-2 text-sm text-slate-400">Review, copy, and export your last 50 generated business outputs.</p></div>
      <HistoryList runs={(runs ?? []) as never[]} />
    </>
  );
}
