import Link from "next/link";
import { Workflow } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="AutoFlow AI home">
      <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/25">
        <Workflow className="size-5" />
      </span>
      {!compact && (
        <span>
          <span className="block text-base font-semibold tracking-tight text-white">AutoFlow AI</span>
          <span className="block text-[11px] uppercase tracking-[0.18em] text-slate-500">Automation studio</span>
        </span>
      )}
    </Link>
  );
}
