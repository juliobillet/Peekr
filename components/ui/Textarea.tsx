import { cn } from "@/lib/utils/cn";
import type { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string };

export function Textarea({ label, error, className, id, ...props }: Props) {
  const fieldId = id ?? props.name;
  return (
    <div className="space-y-1.5">
      {label ? <label htmlFor={fieldId} className="text-sm font-medium text-zinc-200">{label}</label> : null}
      <textarea id={fieldId} className={cn("min-h-24 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange", className)} {...props} />
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  );
}
