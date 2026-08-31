import type { Service } from "@/lib/mock-data";
import { services } from "@/lib/mock-data";
import { ServiceCard } from "./ServiceCard";
export function ProfileServices({ onSelect }: { onSelect: (service: Service) => void }) { return <div><div className="mb-5"><h2 className="text-2xl font-extrabold text-[#0d1b57]">Peeks com Athlon</h2><p className="mt-1 text-[#68799f]">Escolha o formato que melhor atende seu momento.</p></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{services.map(service => <ServiceCard key={service.id} service={service} onSelect={onSelect}/>)}</div></div>; }
