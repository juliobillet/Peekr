import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger"; size?: "sm" | "md" | "lg"; href?: string; children: ReactNode };
const variants = { primary: "bg-[#0b4bff] text-white hover:bg-[#073bd1] shadow-sm", secondary: "border border-[#ccd8f6] bg-white text-[#0d1b57] hover:border-brand-blue hover:bg-blue-50", ghost: "text-[#40547c] hover:bg-blue-50", danger: "bg-red-600 text-white hover:bg-red-500" };
const sizes = { sm: "h-10 px-3 text-sm", md: "h-11 px-4", lg: "h-12 px-6 text-base" };
export function Button({ variant = "primary", size = "md", className, href, children, ...props }: Props) { const classes = cn("inline-flex items-center justify-center rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-50", variants[variant], sizes[size], className); if (href) return <Link href={href} className={classes}>{children}</Link>; return <button className={classes} {...props}>{children}</button>; }
