"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function LoginForm({ initialMessage }: { initialMessage?: string }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(initialMessage ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback?next=/dashboard`;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    setLoading(false);
    setMessage(error ? error.message : "Check your email for a secure sign-in link.");
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-300">Work email</span>
        <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950 px-4 focus-within:border-indigo-400/60">
          <Mail className="size-4 text-slate-500" />
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
          />
        </span>
      </label>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <LoaderCircle className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
        {loading ? "Sending secure link" : "Continue with email"}
      </Button>
      {message && (
        <p className="rounded-xl border border-indigo-400/20 bg-indigo-400/10 p-3 text-sm text-indigo-100" role="status">
          {message}
        </p>
      )}
    </form>
  );
}
