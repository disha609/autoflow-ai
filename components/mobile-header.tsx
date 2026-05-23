import Link from "next/link";
import { History, LayoutDashboard, PlusCircle } from "lucide-react";
import { Logo } from "@/components/logo";

export function MobileHeader() {
  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-slate-950/80 p-4 lg:hidden">
      <Logo compact />
      <nav className="flex gap-1">
        {[
          ["/dashboard", LayoutDashboard, "Dashboard"],
          ["/workflow/new", PlusCircle, "New workflow"],
          ["/history", History, "History"],
        ].map(([href, Icon, label]) => {
          const I = Icon as typeof LayoutDashboard;
          return (
            <Link key={href as string} href={href as string} aria-label={label as string} className="rounded-lg p-2 text-slate-300 hover:bg-white/10">
              <I className="size-5" />
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
