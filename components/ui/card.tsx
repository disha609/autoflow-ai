import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.045] shadow-[0_18px_70px_-30px_rgba(15,23,42,0.75)] backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
