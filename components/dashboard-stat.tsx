import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function DashboardStat({ label, value, helper, icon: Icon }: { label: string; value: string; helper: string; icon: LucideIcon }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">{label}</span>
        <span className="rounded-lg bg-indigo-500/10 p-2 text-indigo-300"><Icon className="size-4" /></span>
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{helper}</p>
    </Card>
  );
}
