import Link from "next/link";
import { ArrowRight, FileJson2, ListTodo, Mail, ShieldCheck, Sparkles, TextQuote, Zap } from "lucide-react";
import { Logo } from "@/components/logo";
import { Card } from "@/components/ui/card";

const workflows = [
  { icon: TextQuote, title: "Summarize documents", text: "Generate concise executive briefs from dense source text." },
  { icon: ListTodo, title: "Extract actions", text: "Identify next steps, ownership gaps, and deadlines." },
  { icon: Mail, title: "Draft emails", text: "Create polished communications ready for review." },
  { icon: FileJson2, title: "Structure data", text: "Turn unstructured material into useful JSON." },
];

export default function HomePage() {
  return (
    <main className="grid-glow min-h-screen bg-slate-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white sm:inline-flex">Sign in</Link>
          <Link href="/login" className="inline-flex h-11 items-center gap-2 rounded-xl bg-indigo-500 px-5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400">Start free <ArrowRight className="size-4" /></Link>
        </div>
      </header>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pt-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-xs font-medium text-indigo-200"><Sparkles className="size-3.5" /> AI operations workspace</span>
          <h1 className="mt-7 max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">Transform business text into action.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">AutoFlow AI turns briefs, meeting notes, and documents into executive summaries, task lists, polished emails, and structured data—securely and in seconds.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/login" className="inline-flex h-12 items-center gap-2 rounded-xl bg-indigo-500 px-6 text-sm font-medium text-white shadow-xl shadow-indigo-500/25 transition hover:bg-indigo-400">Build a workflow <ArrowRight className="size-4" /></Link>
            <a href="#workflows" className="inline-flex h-12 items-center rounded-xl border border-white/10 bg-white/[0.04] px-6 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08]">Explore features</a>
          </div>
          <div className="mt-12 flex flex-wrap gap-6 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-emerald-400" /> Private per-user history</span>
            <span className="inline-flex items-center gap-2"><Zap className="size-4 text-amber-300" /> Free-tier friendly stack</span>
          </div>
        </div>
        <Card className="relative overflow-hidden p-4 sm:p-5">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
          <div className="rounded-xl border border-white/10 bg-slate-950/90 p-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4"><span className="size-2.5 rounded-full bg-rose-400" /><span className="size-2.5 rounded-full bg-amber-300" /><span className="size-2.5 rounded-full bg-emerald-400" /><p className="ml-3 text-xs text-slate-500">New Workflow</p></div>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-400">Quarterly update: Renewals grew 18%. The enterprise pilot requires security review before June 4. Maya will send the procurement package...</div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {workflows.map((workflow, index) => <div key={workflow.title} className={`rounded-lg border p-3 text-xs ${index === 1 ? "border-indigo-400/45 bg-indigo-500/10 text-indigo-200" : "border-white/10 text-slate-500"}`}>{workflow.title}</div>)}
            </div>
            <div className="mt-4 rounded-xl border border-indigo-400/15 bg-indigo-500/[0.08] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">Action items</p>
              <p className="mt-3 text-sm text-slate-200">1. Complete security review — Owner: Not specified — Due: June 4</p>
              <p className="mt-2 text-sm text-slate-200">2. Send procurement package — Owner: Maya</p>
            </div>
          </div>
        </Card>
      </section>
      <section id="workflows" className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="mb-10 max-w-2xl"><p className="text-sm font-medium text-indigo-300">Purpose-built workflows</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Outputs your team can use immediately.</h2></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{workflows.map(({ icon: Icon, title, text }) => <Card key={title} className="p-5"><span className="inline-flex rounded-xl bg-indigo-500/10 p-3 text-indigo-300"><Icon className="size-5" /></span><h3 className="mt-5 font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></Card>)}</div>
      </section>
    </main>
  );
}
