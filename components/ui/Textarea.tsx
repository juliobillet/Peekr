import { cn } from "@/lib/utils/cn";
import type { TextareaHTMLAttributes } from "react";
type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string };
export function Textarea({ label, error, className, id, ...props }: Props) { const fieldId = id ?? props.name; return <div className="space-y-1.5">{label && <label htmlFor={fieldId} className="text-sm font-bold text-[#274477]">{label}</label>}<textarea id={fieldId} className={cn("min-h-24 w-full rounded-xl border border-[#ccd8f6] bg-white px-3 py-2 text-[#0d1b57]", className)} {...props}/>{error && <p className="text-sm text-red-600">{error}</p>}</div>; }
