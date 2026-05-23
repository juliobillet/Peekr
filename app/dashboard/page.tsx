import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { routes } from "@/lib/routes";

export default function DashboardPage() {
  return <div className="space-y-6"><h1 className="text-3xl font-bold">Olá, especialista 👋</h1><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><StatCard title="Peeks futuros" value="3" /><StatCard title="Peeks realizados" value="26" /><StatCard title="Peekers atendidos" value="18" /><StatCard title="Receita estimada" value="R$ 2.340" /></div><Card><CardHeader><CardTitle>Próximas ações</CardTitle></CardHeader><CardContent className="grid gap-2 sm:grid-cols-2"><Button href={routes.settings} variant="secondary">Completar perfil</Button><Button href={routes.profile("oathlon")} variant="secondary">Criar serviço</Button><Button href={routes.agenda} variant="secondary">Configurar agenda</Button><Button href={routes.profile("oathlon")} variant="secondary">Ver página pública</Button></CardContent></Card></div>;
}
