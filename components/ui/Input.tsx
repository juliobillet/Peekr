import { cn } from "@/lib/utils/cn";
import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string; helperText?: string };

export function Input({ label, error, helperText, className, id, ...props }: Props) {
  const inputId = id ?? props.name;
  return (
    <div className="space-y-1.5">
      {label ? <label htmlFor={inputId} className="text-sm font-medium text-zinc-200">{label}</label> : null}
      <input id={inputId} className={cn("h-10 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange", className)} {...props} />
      {error ? <p className="text-sm text-red-400">{error}</p> : helperText ? <p className="text-sm text-zinc-400">{helperText}</p> : null}
    </div>
  );
}
