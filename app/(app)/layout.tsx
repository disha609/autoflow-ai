import { AppSidebar } from "@/components/app-sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { requireUser } from "@/lib/auth";

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  return (
    <div className="flex min-h-screen bg-slate-950">
      <AppSidebar email={user.email ?? "Workspace user"} />
      <div className="min-w-0 flex-1">
        <MobileHeader />
        <main className="mx-auto max-w-7xl p-5 sm:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
