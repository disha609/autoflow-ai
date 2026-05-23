import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock3, FileText, Sparkles } from "lucide-react";
import { DashboardStat } from "@/components/dashboard-stat";
import { Card } from "@/components/ui/card";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { workflowDefinitions, type WorkflowType } from "@/lib/workflows";
import { formatDate, truncate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: runs = [] } = await supabase.from("workflow_runs").select("id, workflow_type, output_text, input_char_count, created_at").order("created_at", { ascending: false }).limit(8);
  const totalCharacters = runs?.reduce((total, run) => total + run.input_char_count, 0) ?? 0;
  const latest = runs?.[0];

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div><p className="text-sm font-medium text-indigo-300">Workspace overview</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Dashboard</h1><p className="mt-2 text-sm text-slate-400">Monitor your latest AI-powered business outputs.</p></div>
        <Link href="/workflow/new" className="inline-flex h-11 items-center gap-2 rounded-xl bg-indigo-500 px-5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400"><Sparkles className="size-4" /> New workflow</Link>
      </div>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <DashboardStat icon={FileText} label="Recent workflows" value={String(runs?.length ?? 0)} helper="Most recent 8 outputs" />
        <DashboardStat icon={Sparkles} label="Text processed" value={totalCharacters.toLocaleString()} helper="Characters in visible history" />
        <DashboardStat icon={Clock3} label="Latest run" value={latest ? workflowDefinitions[latest.workflow_type as WorkflowType].shortLabel : "—"} helper={latest ? formatDate(latest.created_at) : "Start your first workflow"} />
      </section>
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold text-white">Recent outputs</h2><Link href="/history" className="inline-flex items-center gap-1 text-sm text-indigo-300 hover:text-indigo-200">View history <ArrowRight className="size-4" /></Link></div>
        <Card className="overflow-hidden">
          {runs?.length ? runs.map((run, index) => (
            <Link key={run.id} href="/history" className={`flex flex-col gap-2 p-5 transition hover:bg-white/[0.045] sm:flex-row sm:items-center sm:justify-between ${index ? "border-t border-white/10" : ""}`}>
              <div><p className="text-xs font-medium uppercase tracking-wider text-indigo-300">{workflowDefinitions[run.workflow_type as WorkflowType].label}</p><p className="mt-2 text-sm text-slate-300">{truncate(run.output_text, 95)}</p></div>
              <span className="shrink-0 text-xs text-slate-500">{formatDate(run.created_at)}</span>
            </Link>
          )) : <div className="p-12 text-center"><p className="text-sm text-slate-400">No workflows yet. Turn your first document into an actionable output.</p><Link href="/workflow/new" className="mt-4 inline-flex text-sm font-medium text-indigo-300">Create workflow →</Link></div>}
        </Card>
      </section>
    </>
  );
}
