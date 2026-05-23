"use client";

import { ChangeEvent, useMemo, useRef, useState } from "react";
import {
  Check,
  Clipboard,
  Download,
  FileText,
  LoaderCircle,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  workflowDefinitions,
  workflowTypes,
  type WorkflowType,
} from "@/lib/workflows";

const MAX_CHARS = 50000;

export function WorkflowStudio() {
  const [workflow, setWorkflow] = useState<WorkflowType>("summarize");
  const [input, setInput] = useState("");
  const [sourceName, setSourceName] = useState("Pasted text");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fileInput = useRef<HTMLInputElement>(null);

  const selected = workflowDefinitions[workflow];
  const characters = input.length;
  const remaining = MAX_CHARS - characters;
  const canGenerate = input.trim().length >= 20 && remaining >= 0 && !isLoading;

  const filename = useMemo(() => {
    const timestamp = new Date().toISOString().slice(0, 10);
    return `autoflow-${workflow}-${timestamp}.txt`;
  }, [workflow]);

  async function loadFile(event: ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!/\.(txt|md|csv|json)$/i.test(file.name)) {
    setError("Upload a text-based file: .txt, .md, .csv, or .json.");
    return;
  }

  const text = await file.text();
  setInput(text.slice(0, MAX_CHARS));
  setSourceName(file.name);
  setError(text.length > MAX_CHARS ? "File was trimmed to the 50,000 character limit." : "");
}

  async function generate() {
    setIsLoading(true);
    setOutput("");
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workflow, input, sourceName }),
      });

      const data = (await response.json()) as {
        output?: string;
        error?: string;
      };

      if (!response.ok || !data.output) {
        throw new Error(data.error ?? "Generation failed.");
      }

      setOutput(data.output);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to complete workflow."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function copyOutput() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function exportOutput() {
    const url = URL.createObjectURL(
      new Blob([output], { type: "text/plain;charset=utf-8" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  function renderOutput() {
  const trimmed = output.trim();

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return (
        <pre className="overflow-auto rounded-xl bg-slate-950 p-5 text-sm leading-7 text-emerald-100">
          {JSON.stringify(JSON.parse(trimmed), null, 2)}
        </pre>
      );
    } catch {
      return <pre>{output}</pre>;
    }
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="mb-4 mt-6 border-b border-white/10 pb-2 text-xl font-bold text-white">
            {children}
          </h2>
        ),
        p: ({ children }) => <p className="mb-4 text-sm leading-7 text-slate-200">{children}</p>,
        strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
        ul: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-6 text-slate-200">{children}</ul>,
        li: ({ children }) => <li className="leading-7">{children}</li>,
        table: ({ children }) => (
          <div className="my-5 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full border-collapse text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-white/10 bg-slate-900 px-4 py-3 text-left font-bold text-white">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-white/10 px-4 py-3 text-slate-200">{children}</td>
        ),
      }}
    >
      {output}
    </ReactMarkdown>
  );
}

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(360px,0.94fr)_minmax(420px,1.06fr)]">
      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-indigo-500/15 p-2 text-indigo-300">
            <FileText className="size-5" />
          </span>
          <div>
            <h2 className="font-semibold text-white">Source material</h2>
            <p className="text-xs text-slate-500">
              Paste text or upload a supported document
            </p>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setSourceName("Pasted text");
          }}
          placeholder="Paste meeting notes, a proposal, contract excerpt, client brief, or project update…"
          className="mt-5 min-h-72 w-full resize-y rounded-xl border border-white/10 bg-slate-950/80 p-4 text-sm leading-6 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60"
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={() => fileInput.current?.click()}
            className="inline-flex items-center gap-2 rounded-lg border border-dashed border-white/15 px-3 py-2 text-slate-300 transition hover:border-indigo-400/40 hover:text-white"
          >
            <UploadCloud className="size-4" />
            Upload file
          </button>

          <input
            ref={fileInput}
            type="file"
            accept=".txt,.md,.csv,.json"
            className="hidden"
            onChange={loadFile}
          />

          <span className={remaining < 0 ? "text-rose-300" : "text-slate-500"}>
            {characters.toLocaleString()} / {MAX_CHARS.toLocaleString()}{" "}
            characters
          </span>
        </div>

        <div className="mt-7">
          <p className="mb-3 text-sm font-medium text-slate-300">
            Select workflow
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {workflowTypes.map((type) => {
              const item = workflowDefinitions[type];
              const active = workflow === type;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setWorkflow(type)}
                  className={`rounded-xl border p-4 text-left transition ${
                    active
                      ? "border-indigo-400/50 bg-indigo-500/10"
                      : "border-white/10 bg-slate-950/50 hover:border-white/20"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      active ? "text-indigo-200" : "text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">
                    {item.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <Button
          className="mt-6 w-full"
          disabled={!canGenerate}
          onClick={generate}
        >
          {isLoading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {isLoading ? "Running workflow…" : "Generate output"}
        </Button>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/10 p-3 text-sm text-rose-200"
          >
            {error}
          </p>
        )}
      </Card>

      <Card className="flex min-h-[640px] flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h2 className="font-semibold text-white">AI output</h2>
            <p className="text-xs text-slate-500">
              {selected.label} · {sourceName}
            </p>
          </div>

          {output && (
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="h-10 px-3"
                onClick={copyOutput}
              >
                {copied ? (
                  <Check className="size-4" />
                ) : (
                  <Clipboard className="size-4" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>

              <Button
                variant="secondary"
                className="h-10 px-3"
                onClick={exportOutput}
              >
                <Download className="size-4" />
                TXT
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col pt-5">
          {isLoading ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <LoaderCircle className="size-8 animate-spin text-indigo-300" />
              <p className="mt-4 text-sm font-medium text-white">
                Transforming your document
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Generating a polished, reusable business output.
              </p>
            </div>
          ) : output ? (
            <div className="flex-1 overflow-auto rounded-xl bg-slate-950/65 p-6 text-slate-200">
              <article className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2 prose-p:text-slate-200 prose-strong:text-white prose-li:text-slate-200 prose-table:w-full prose-th:border prose-th:border-white/10 prose-th:bg-slate-900 prose-th:p-3 prose-th:text-white prose-td:border prose-td:border-white/10 prose-td:p-3 prose-td:text-slate-300">
                {renderOutput()}
              </article>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 text-center">
              <Sparkles className="size-8 text-slate-600" />
              <p className="mt-4 text-sm font-medium text-slate-300">
                Output appears here
              </p>
              <p className="mt-1 max-w-xs text-sm text-slate-500">
                Choose a workflow and submit your source text to begin.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}