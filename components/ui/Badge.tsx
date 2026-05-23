import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

type Variant = "default" | "success" | "warning" | "danger" | "violet";
const styles: Record<Variant, string> = {
  default: "bg-zinc-800 text-zinc-200",
  success: "bg-emerald-950 text-emerald-300",
  warning: "bg-amber-950 text-amber-300",
  danger: "bg-red-950 text-red-300",
  violet: "bg-brand-orange text-white shadow-[0_0_0_1px_rgba(18,93,217,0.28),0_0_14px_rgba(246,139,10,0.25)]",
};

export function Badge({ className, variant = "default", children, ...props }: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", styles[variant], className)} {...props}>{children}</span>;
}
