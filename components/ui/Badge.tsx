import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";
type Variant = "default" | "success" | "warning" | "danger" | "violet";
const styles: Record<Variant, string> = { default: "bg-blue-50 text-[#24477e]", success: "bg-emerald-50 text-emerald-700", warning: "bg-orange-50 text-orange-700", danger: "bg-red-50 text-red-700", violet: "bg-brand-blue text-white" };
export function Badge({ className, variant = "default", children, ...props }: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) { return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", styles[variant], className)} {...props}>{children}</span>; }
