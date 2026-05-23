import Link from "next/link";
import { History, LayoutDashboard, LogOut, PlusCircle } from "lucide-react";
import { Logo } from "@/components/logo";
import { signOut } from "@/app/actions";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workflow/new", label: "New Workflow", icon: PlusCircle },
  { href: "/history", label: "History", icon: History },
];

export function AppSidebar({ email }: { email: string }) {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-slate-950/80 p-6 lg:flex lg:flex-col">
      <Logo />
      <nav className="mt-12 space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <p className="truncate text-sm font-medium text-white">{email}</p>
        <p className="mt-1 text-xs text-slate-500">Authenticated workspace</p>
        <form action={signOut} className="mt-4">
          <button className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
            <LogOut className="size-4" /> Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
