"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AppError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Card className="mx-auto mt-16 max-w-lg p-8 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-300">
        <AlertTriangle className="size-6" />
      </span>
      <h1 className="mt-5 text-xl font-semibold text-white">Workspace could not load</h1>
      <p className="mt-2 text-sm leading-6 text-slate-400">An unexpected error occurred while retrieving this page. Your saved workflows remain protected in your account.</p>
      <Button className="mt-6" onClick={() => reset()}>Try again</Button>
    </Card>
  );
}
