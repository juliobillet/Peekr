"use client";

import { cn } from "@/lib/utils/cn";

type Item = { value: string; label: string };

export function Tabs({ items, value, onChange }: { items: Item[]; value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button key={item.value} onClick={() => onChange(item.value)} className={cn("rounded-lg border px-3 py-1.5 text-sm transition", value === item.value ? "border-brand-blue bg-brand-blue/20 text-white" : "border-zinc-700 text-zinc-300 hover:bg-zinc-800")}>
          {item.label}
        </button>
      ))}
    </div>
  );
}
