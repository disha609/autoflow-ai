import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const styles: Record<Variant, string> = {
  primary: "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400 disabled:bg-indigo-500/50",
  secondary: "border border-white/10 bg-white/[0.06] text-slate-100 hover:bg-white/[0.1]",
  ghost: "text-slate-300 hover:bg-white/[0.07] hover:text-white",
  danger: "border border-rose-500/20 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20",
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 disabled:cursor-not-allowed",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
