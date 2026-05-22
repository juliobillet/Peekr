import { cn } from "@/lib/utils/cn";

type Props = { name: string; src?: string | null; className?: string };

export function Avatar({ name, src, className }: Props) {
  const initials = name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  if (src) return <img src={src} alt={name} className={cn("h-14 w-14 rounded-full object-cover", className)} />;
  return <div className={cn("flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue font-semibold text-white", className)}>{initials}</div>;
}
