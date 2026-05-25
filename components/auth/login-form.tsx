"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle, Lock, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function LoginForm({ initialMessage }: { initialMessage?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(initialMessage ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const supabase = createClient();

    const login = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!login.error) {
      window.location.href = "/dashboard";
      return;
    }

    const signup = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (signup.error) {
      setMessage(signup.error.message);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-300">
          Email
        </span>
        <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950 px-4 focus-within:border-indigo-400/60">
          <Mail className="size-4 text-slate-500" />
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
          />
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-300">
          Password
        </span>
        <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950 px-4 focus-within:border-indigo-400/60">
          <Lock className="size-4 text-slate-500" />
          <input
            required
            minLength={6}
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimum 6 characters"
            className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
          />
        </span>
      </label>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <ArrowRight className="size-4" />
        )}
        {loading ? "Signing in..." : "Continue"}
      </Button>

      {message && (
        <p
          className="rounded-xl border border-indigo-400/20 bg-indigo-400/10 p-3 text-sm text-indigo-100"
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}