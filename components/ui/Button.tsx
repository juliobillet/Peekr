import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-orange text-white hover:bg-orange-500 hover:shadow-[0_0_0_1px_rgba(18,93,217,0.35),0_0_16px_rgba(18,93,217,0.28)]",
  secondary:
    "bg-brand-orange text-white hover:bg-orange-500 hover:shadow-[0_0_0_1px_rgba(18,93,217,0.35),0_0_16px_rgba(18,93,217,0.28)]",
  ghost:
    "text-zinc-700 hover:bg-zinc-100",
  danger: "bg-red-600 text-white hover:bg-red-500",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4",
  lg: "h-12 px-6 text-base",
};

export function Button({ variant = "primary", size = "md", className, href, children, ...props }: Props) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) return <Link href={href} className={classes}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}
