import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { routes } from "@/lib/routes";

const useCases = ["Aulas particulares", "Mentorias", "Revisões", "Consultorias", "Prática guiada", "Orientação profissional"];
const steps = ["Crie seu perfil", "Abra horários na agenda", "Receba reservas pagas", "Encontre seu cliente em uma sala efêmera"];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="space-y-6 py-10">
        <Badge variant="violet">Sessões privadas ao vivo</Badge>
        <h1 className="max-w-3xl text-4xl font-bold md:text-6xl">Venda sua presença. Não um curso.</h1>
        <p className="max-w-3xl text-zinc-600 dark:text-zinc-300">A Peekr reúne perfil, agenda, pagamento e sala efêmera para aulas, mentorias, revisões e consultorias privadas ao vivo.</p>
        <div className="flex flex-wrap gap-3">
          <Button href={routes.register}>Criar meu perfil</Button>
          <Button href={routes.profile("oathlon")} variant="secondary">Ver exemplo de perfil</Button>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading title="Como funciona" />
        <div className="grid gap-3 md:grid-cols-4">{steps.map((s, i) => <Card key={s}><CardContent><p className="text-sm text-brand-orange">0{i + 1}</p><p className="mt-2 font-medium text-zinc-800 dark:text-zinc-100">{s}</p></CardContent></Card>)}</div>
      </section>

      <section className="space-y-6">
        <SectionHeading title="Para que serve" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{useCases.map((item) => <Card key={item}><CardHeader><CardTitle>{item}</CardTitle></CardHeader></Card>)}</div>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
        <SectionHeading title="Efêmero por padrão" description="A sala abre antes do horário, acontece ao vivo e deixa de aceitar acessos após o encerramento. A Peekr não grava sessões por padrão." />
        <p className="text-sm text-zinc-600 dark:text-zinc-400">A Peekr também não promete bloqueio absoluto contra gravações externas feitas por softwares ou dispositivos de terceiros.</p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/60">
        <h2 className="text-2xl font-bold">Pronto para vender seu tempo com menos atrito?</h2>
        <div className="mt-5"><Button href={routes.register} size="lg">Criar perfil na Peekr</Button></div>
      </section>
    </div>
  );
}
