import { EmptyState } from "@/components/ui/EmptyState";

export default function AgendaPage() {
  return <div className="space-y-5"><h1 className="text-3xl font-bold">Agenda</h1><p className="text-zinc-400">Gerencie sua disponibilidade semanal e mensal.</p><div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"><div className="grid grid-cols-7 gap-2 text-center text-sm text-zinc-300">{Array.from({ length: 35 }).map((_, i) => <div key={i} className="rounded-md border border-zinc-800 p-2">{(i % 30) + 1}</div>)}</div></div><EmptyState title="Agenda em preparação" description="Em breve você poderá criar horários disponíveis para receber reservas." /></div>;
}
