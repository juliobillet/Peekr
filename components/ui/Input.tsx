import { cn } from "@/lib/utils/cn";
import type { InputHTMLAttributes } from "react";
type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string; helperText?: string };
export function Input({ label, error, helperText, className, id, ...props }: Props) { const inputId = id ?? props.name; return <div className="space-y-1.5">{label && <label htmlFor={inputId} className="text-sm font-bold text-[#274477]">{label}</label>}<input id={inputId} className={cn("min-h-11 w-full rounded-xl border border-[#ccd8f6] bg-white px-3 text-[#0d1b57] placeholder:text-[#9aa7c1]", className)} {...props}/>{error ? <p className="text-sm text-red-600">{error}</p> : helperText ? <p className="text-sm text-[#68799f]">{helperText}</p> : null}</div>; }
