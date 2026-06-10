import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import type { Service } from "@/lib/mock-data";
import { formatCurrencyBRL } from "@/lib/utils/format";
export function ServiceCard({ service, onSelect }: { service: Service; onSelect: (service: Service) => void }) { return <Card className="h-full"><CardContent className="flex h-full flex-col"><div className="flex flex-wrap gap-2">{service.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}</div><h3 className="mt-4 text-xl font-extrabold text-[#0d1b57]">{service.title}</h3><p className="mt-2 flex-1 leading-6 text-[#5b6d94]">{service.description}</p><div className="my-5 flex items-end justify-between gap-3 border-t border-[#e8edf8] pt-4"><span className="text-sm font-semibold text-[#68799f]">{service.durationMinutes} minutos</span><strong className="text-xl text-[#0d1b57]">{formatCurrencyBRL(service.priceCents)}</strong></div><Button onClick={() => onSelect(service)} className="w-full">Reservar este Peek</Button></CardContent></Card>; }
