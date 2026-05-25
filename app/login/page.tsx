import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/logo";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const params = await searchParams;
  return (
    <main className="grid-glow flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-between"><Logo /><Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="size-4" /> Home</Link></div>
        <Card className="p-7 sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Welcome to AutoFlow AI</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">Sign in with a passwordless magic link to secure your workflow history.</p>
          <LoginForm initialMessage={params.message} />
          <div className="mt-7 flex gap-3 border-t border-white/10 pt-5 text-xs leading-5 text-slate-500"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-400" /><p>Your generated outputs are isolated to your account with Supabase Row Level Security.</p></div>
        </Card>
      </div>
    </main>
  );
}