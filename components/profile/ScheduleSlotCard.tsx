import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { AvailabilitySlot } from "@/lib/mock-data";
import { formatTime } from "@/lib/utils/format";
export function ScheduleSlotCard({ slot, onSelect }: { slot: AvailabilitySlot; onSelect: () => void }) { const reserved = slot.status === "reserved"; return <div className={`flex items-center justify-between gap-3 rounded-xl border p-3 ${reserved ? "border-zinc-200 bg-zinc-50" : "border-[#dbe5fa] bg-white"}`}><div><strong className="text-lg text-[#0d1b57]">{formatTime(slot.startsAt)}</strong><div className="mt-1">{reserved ? <Badge variant="warning">Reservado</Badge> : <Badge variant="success">Disponível</Badge>}</div></div><Button size="sm" variant={reserved ? "ghost" : "secondary"} disabled={reserved} onClick={onSelect}>{reserved ? "Indisponível" : "Selecionar"}</Button></div>; }
