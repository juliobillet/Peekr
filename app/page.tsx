import Link from "next/link";

const howItWorks = [
  {
    step: "1",
    title: "Crie seu perfil",
    description: "Mostre quem você é, suas especialidades e como pode ajudar.",
    icon: "/icons/profile-icon.png",
  },
  {
    step: "2",
    title: "Abra horários na agenda",
    description: "Defina sua disponibilidade e personalize a duração e o valor das sessões.",
    icon: "/icons/calendar-icon.png",
  },
  {
    step: "3",
    title: "Receba reservas e pagas",
    description: "Suas clientes selecionam o horário e pagam com segurança na plataforma.",
    icon: "/icons/credit-card-icon.png",
  },
  {
    step: "4",
    title: "Encontre sua cliente em uma sala efêmera",
    description: "A sala abre antes do horário, acontece ao vivo e encerra ao final da sessão.",
    icon: "/icons/camera-icon.png",
  },
];

const audienceCards = [
  { title: "Aulas particulares", icon: "/icons/presentation-icon.png" },
  { title: "Mentorias", icon: "/icons/profile-arrow-icon.png" },
  { title: "Revisões", icon: "/icons/note-icon.png" },
  { title: "Consultorias", icon: "/icons/message-icon.png" },
  { title: "Prática guiada", icon: "/icons/pin-icon.png" },
  { title: "Orientação profissional", icon: "/icons/profile-big-arrow-icon.png" },
];


export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1320px] space-y-12 px-4 pb-8 pt-6 md:px-8">
      <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-6 pt-6">
          <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-brand-orange">
            ⭐ A plataforma de sessões privadas ao vivo
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.02] tracking-tight text-brand-blue sm:text-6xl lg:text-7xl">
            Venda sua presença.
            <br />
            <span className="text-brand-orange">Não um curso.</span>
          </h1>
          <p className="max-w-xl text-lg/relaxed text-[#0c1b58] sm:text-2xl/relaxed">
            Peekr reúne perfil, agenda, pagamento e sala efêmera para aulas, mentorias, revisões e consultorias privadas ao vivo.
            Você ensina, orienta e transforma — nós cuidamos do resto.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className="rounded-xl bg-[#0b4bff] px-8 py-4 text-lg font-semibold text-white">
              Criar meu perfil
            </Link>
            <Link
              href="/athlon"
              className="rounded-xl border border-[#d4ddf8] bg-white px-8 py-4 text-lg font-semibold text-[#0d1b57] transition hover:text-brand-orange"
            >
              Ver exemplo de perfil
            </Link>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-4 pt-2 sm:grid-cols-3 text-[#0d1b57]">
            <div className="flex items-center gap-2"><span>👥</span><span><b>+10 mil</b> profissionais</span></div>
            <div className="flex items-center gap-2"><span>📅</span><span><b>+120 mil</b> sessões realizadas</span></div>
            <div className="flex items-center gap-2"><span>🛡️</span><span>Segurança e privacidade</span></div>
          </div>
        </div>

        <div className="relative pb-28 lg:pb-20">
          <img src="/mockups/profile-schedule.png" alt="Perfil e agenda" className="w-full" />
          <img src="/mockups/payment-card.png" alt="Reserva e pagamento" className="absolute -bottom-6 left-2 w-[37%]" />
          <img src="/mockups/room-card.png" alt="Sala efêmera" className="absolute -bottom-12 right-0 w-[58%]" />
        </div>
      </section>

      <p className="text-center text-lg text-[#5b6a91]">🛡️ Ambiente seguro, pagamentos protegidos e nenhuma gravação por padrão.</p>

      <section className="space-y-10 pt-2">
        <h2 className="text-center text-3xl font-bold sm:text-5xl text-[#0d1b57]">Como funciona</h2>
        <div className="grid gap-8 md:grid-cols-4">
          {howItWorks.map((item, index) => (
            <article key={item.step} className="space-y-4 text-center">
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d9e2fa] bg-white shadow-sm">
                <img src={item.icon} alt="" className="max-h-7 max-w-7 object-contain" />
                <span className="absolute -bottom-2 -left-2 rounded bg-[#0b4bff] px-1.5 py-0.5 text-xs font-bold text-white">{index + 1}</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#0d1b57]">{item.title}</h3>
              <p className="text-lg text-[#5c6d94]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-center text-3xl font-bold sm:text-5xl text-[#0d1b57]">Para quem é o Peekr</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {audienceCards.map((item) => (
            <article key={item.title} className="flex min-h-40 flex-col items-center justify-center gap-4 rounded-2xl border border-[#e3e9fb] bg-white p-4 text-center">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                <img src={item.icon} alt="" className="max-h-9 max-w-9 object-contain" />
              </div>
              <h3 className="text-xl font-semibold leading-tight text-[#0d1b57]">{item.title}</h3>
            </article>
          ))}
        </div>
        <p className="text-center text-2xl text-[#5c6d94]">Educação, carreira, idiomas, negócios, tecnologia e muito mais.</p>
      </section>

      <section className="rounded-3xl border border-[#15378f] bg-[#031952] p-8 text-white">
        <div className="grid items-center gap-8 md:grid-cols-[1.1fr_1fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">Privacidade que gera confiança</p>
            <h2 className="mt-2 text-5xl font-bold">Efêmero por padrão</h2>
            <p className="mt-4 text-2xl text-blue-100">A sala abre antes do horário, acontece ao vivo e para de aceitar acessos quando a sessão termina. Suas sessões não são gravadas por padrão.</p>
          </div>
          <ul className="space-y-4 text-xl text-blue-100">
            <li>✅ Sala privada e criptografada</li>
            <li>✅ Acesso restrito ao horário da sessão</li>
            <li>✅ Sem gravações por padrão</li>
          </ul>
          <img src="/mockups/lock-visual.png" alt="Privacidade" className="w-full" />
        </div>
      </section>

      <section className="rounded-3xl bg-[#f3f6ff] p-8">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#0d1b57] sm:text-5xl">Pronto para transformar sua presença em impacto?</h2>
            <p className="text-2xl text-[#5c6d94]">Crie seu perfil gratuitamente e comece a receber seus primeiros agendamentos.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="rounded-xl bg-[#0b4bff] px-6 py-3 text-lg font-semibold text-white">Criar meu perfil</Link>
              <Link href="/athlon" className="rounded-xl border border-[#d4ddf8] bg-white px-6 py-3 text-lg font-semibold text-[#0d1b57] transition hover:text-brand-orange">Ver exemplo de perfil</Link>
            </div>
          </div>
          <img src="/mockups/overview-card.png" alt="Visão geral e próxima sessão" className="w-full" />
        </div>
      </section>

    </div>
  );
}
