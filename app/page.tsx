import Image from "next/image";
import Link from "next/link";

const featureCards = [
  {
    src: "/mockups/profile-schedule.png",
    alt: "Interface de perfil com agenda",
  },
  {
    src: "/mockups/overview-card.png",
    alt: "Resumo de sessões e próxima sessão",
  },
  {
    src: "/mockups/payment-card.png",
    alt: "Fluxo de reserva e pagamento",
  },
  {
    src: "/mockups/room-card.png",
    alt: "Experiência da sala efêmera ao vivo",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 pb-12">
      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1 text-sm font-semibold text-brand-orange">
            Sessões privadas ao vivo
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-brand-blue sm:text-5xl">
            Venda sua presença. Não um curso.
          </h1>
          <p className="max-w-xl text-lg text-zinc-700 dark:text-zinc-300">
            Perfil, agenda, pagamento e sala efêmera para aulas, mentorias, revisões e consultorias privadas ao vivo.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/register"
              className="rounded-xl bg-brand-orange px-6 py-3 font-semibold text-white transition hover:shadow-[0_0_0_3px_rgba(29,78,216,0.25)]"
            >
              Criar meu perfil
            </Link>
            <Link
              href="/oathlon"
              className="rounded-xl border border-brand-blue/30 px-6 py-3 font-semibold text-brand-blue transition hover:border-brand-orange hover:text-brand-orange"
            >
              Ver exemplo de perfil
            </Link>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/mockups/profile-schedule.png"
            alt="Mockup principal do perfil com agenda"
            width={1335}
            height={968}
            priority
            className="h-auto w-full"
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {featureCards.map((item) => (
          <article key={item.src} className="rounded-3xl border border-zinc-200/70 bg-transparent p-2 dark:border-zinc-800/80">
            <Image src={item.src} alt={item.alt} width={1335} height={968} className="h-auto w-full" />
          </article>
        ))}
      </section>

      <section className="grid items-center gap-8 rounded-3xl border border-zinc-200 p-6 md:grid-cols-[0.95fr_1.05fr] dark:border-zinc-800">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-brand-blue">Efêmero por padrão</h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            A sala abre antes do horário, acontece ao vivo e deixa de aceitar acessos após o encerramento.
            A Peekr não grava sessões por padrão.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            Gravações externas por softwares ou dispositivos de terceiros não podem ser bloqueadas com garantia absoluta.
          </p>
          <div className="text-sm">
            <Link href="/login" className="font-semibold text-brand-blue transition hover:text-brand-orange">
              Entrar
            </Link>
            <span className="mx-2 text-zinc-400">•</span>
            <Link href="/register" className="font-semibold text-brand-blue transition hover:text-brand-orange">
              Criar perfil
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="/mockups/lock-visual.png"
            alt="Visual de privacidade"
            width={1462}
            height={1072}
            className="h-auto w-full max-w-xl"
          />
        </div>
      </section>
    </div>
  );
}
