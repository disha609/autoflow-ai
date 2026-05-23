"use client";

import { useState } from "react";
import { Check, Clipboard, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate, truncate } from "@/lib/utils";
import { workflowDefinitions, type WorkflowType } from "@/lib/workflows";

type Run = {
  id: string;
  workflow_type: WorkflowType;
  input_name: string | null;
  output_text: string;
  input_char_count: number;
  created_at: string;
};

export function HistoryList({ runs }: { runs: Run[] }) {
  const [selectedId, setSelectedId] = useState(runs[0]?.id ?? "");
  const [copied, setCopied] = useState(false);
  const selected = runs.find((run) => run.id === selectedId);

  async function copy() {
    if (!selected) return;
    await navigator.clipboard.writeText(selected.output_text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function download() {
    if (!selected) return;
    const blob = new Blob([selected.output_text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `autoflow-${selected.workflow_type}-${selected.created_at.slice(0, 10)}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  if (!runs.length) {
    return <Card className="p-12 text-center text-sm text-slate-400">No generated outputs yet. Start your first workflow to create history.</Card>;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <div className="space-y-3">
        {runs.map((run) => (
          <button key={run.id} onClick={() => setSelectedId(run.id)} className={`w-full rounded-2xl border p-4 text-left transition ${selectedId === run.id ? "border-indigo-400/40 bg-indigo-500/10" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"}`}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium uppercase tracking-wider text-indigo-300">{workflowDefinitions[run.workflow_type].shortLabel}</span>
              <span className="text-xs text-slate-500">{formatDate(run.created_at)}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{truncate(run.output_text)}</p>
          </button>
        ))}
      </div>
      {selected && (
        <Card className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">{workflowDefinitions[selected.workflow_type].label}</p>
              <h2 className="mt-2 text-lg font-semibold text-white">{selected.input_name || "Pasted text"}</h2>
              <p className="mt-1 text-xs text-slate-500">{selected.input_char_count.toLocaleString()} input characters · {formatDate(selected.created_at)}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" className="h-10 px-3" onClick={copy}>{copied ? <Check className="size-4" /> : <Clipboard className="size-4" />}{copied ? "Copied" : "Copy"}</Button>
              <Button variant="secondary" className="h-10 px-3" onClick={download}><Download className="size-4" /> TXT</Button>
            </div>
          </div>
          <pre className="mt-5 min-h-96 whitespace-pre-wrap break-words rounded-xl bg-slate-950/65 p-5 font-sans text-sm leading-7 text-slate-200">{selected.output_text}</pre>
        </Card>
      )}
    </div>
  );
}
