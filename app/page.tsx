import { Button } from "@/components/ui/Button";

const howItWorks = [
  {
    step: "1",
    title: "Crie seu perfil",
    desc: "Mostre quem você é, suas especialidades e como pode ajudar.",
    icon: "👤",
  },
  {
    step: "2",
    title: "Abra horários na agenda",
    desc: "Defina sua disponibilidade e personalize a duração e valor das sessões.",
    icon: "📅",
  },
  {
    step: "3",
    title: "Receba reservas e pagas",
    desc: "Suas clientes selecionam o horário e pagam com segurança na plataforma.",
    icon: "💳",
  },
  {
    step: "4",
    title: "Encontre sua cliente em uma sala efêmera",
    desc: "A sala abre antes do horário, acontece ao vivo e encerra ao final da sessão.",
    icon: "🎥",
  },
];

const useCases = [
  "Aulas particulares",
  "Mentorias",
  "Revisões",
  "Consultorias",
  "Prática guiada",
  "Orientação profissional",
];

export default function HomePage() {
  return (
    <div className="space-y-16 pb-8 text-[#0b1848] dark:text-zinc-100">
      <section className="grid gap-10 pt-6 lg:grid-cols-[1.05fr_1fr] lg:items-start">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
            <span>⭐</span>
            <span>A plataforma de sessões privadas ao vivo</span>
          </div>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            Venda sua presença.
            <br />
            <span className="text-brand-orange">Não um curso.</span>
          </h1>
          <p className="max-w-xl text-xl leading-relaxed text-[#4a5b8a] dark:text-zinc-300">
            Peekr reúne perfil, agenda, pagamento e sala efêmera para aulas, mentorias, revisões e consultorias privadas ao vivo. Você ensina, orienta e transforma — nós cuidamos do resto.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/register" size="lg">Criar meu perfil</Button>
            <Button href="/oathlon" size="lg" variant="ghost" className="border border-[#d6def7] bg-white text-brand-blue hover:text-brand-orange">Ver exemplo de perfil</Button>
          </div>
          <div className="grid max-w-2xl grid-cols-3 gap-4 pt-2 text-sm">
            <div><p className="text-2xl font-bold text-brand-blue">+10 mil</p><p className="text-[#4a5b8a]">profissionais</p></div>
            <div><p className="text-2xl font-bold text-brand-blue">+120 mil</p><p className="text-[#4a5b8a]">sessões realizadas</p></div>
            <div><p className="text-2xl font-bold text-brand-blue">100%</p><p className="text-[#4a5b8a]">segurança e privacidade</p></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] border border-[#dce4ff] bg-white p-5 shadow-[0_18px_60px_rgba(31,75,255,0.12)]">
            <p className="mb-3 text-4xl font-bold text-brand-blue">Peekr</p>
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.75fr]">
              <div className="rounded-3xl border border-[#e2e7f7] p-4">
                <div className="flex items-start gap-4">
                  <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-[#f0f4ff] to-[#dbe6ff]" />
                  <div>
                    <h3 className="text-4xl font-semibold">Camila Torres</h3>
                    <p className="text-[#5d6f9f]">Mentora de Carreira & Liderança</p>
                    <p className="mt-2 text-[#5d6f9f]">⭐ 5,0 (237 avaliações)</p>
                  </div>
                </div>
                <p className="mt-4 text-lg text-[#4a5b8a]">Ajudo profissionais a alcançarem clareza, confiança e resultados na carreira.</p>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#e5ebff] pt-4 text-sm">
                  <div><p className="text-3xl font-bold">723</p><p className="text-[#5d6f9f]">Sessões</p></div>
                  <div><p className="text-3xl font-bold">98%</p><p className="text-[#5d6f9f]">Avaliações 5 ★</p></div>
                  <div><p className="text-3xl font-bold">2 anos</p><p className="text-[#5d6f9f]">na Peekr</p></div>
                </div>
              </div>
              <div className="rounded-3xl border border-[#e2e7f7] p-4">
                <h4 className="text-3xl font-semibold">Próximos horários</h4>
                <p className="mt-2 text-[#5d6f9f]">Maio 2024</p>
                <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs text-[#5d6f9f]">
                  {Array.from({ length: 35 }).map((_, i) => <span key={i} className={i===16?"rounded-full bg-brand-blue py-1 text-white":"py-1"}>{(i%31)+1}</span>)}
                </div>
                <p className="mt-3 text-sm font-semibold">Ter, 14 de maio</p>
                <div className="mt-2 space-y-2 text-sm">
                  <div className="rounded-xl border border-[#dce4ff] p-2 text-center">09:00</div>
                  <div className="rounded-xl border border-brand-blue p-2 text-center font-semibold text-brand-blue">10:30</div>
                  <div className="rounded-xl border border-[#dce4ff] p-2 text-center">16:30</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-[#dce4ff] bg-white p-5 shadow-[0_18px_48px_rgba(31,75,255,0.10)]">
              <h3 className="text-4xl font-bold">Reserva e pagamento</h3>
              <div className="mt-4 rounded-2xl bg-[#f4f7ff] p-3 text-[#4a5b8a]">Sessão de Mentoria • 60 minutos</div>
              <div className="mt-3 flex justify-between text-lg"><span>Total</span><span className="font-bold">R$ 189,00</span></div>
              <div className="mt-3 grid grid-cols-3 gap-2"><button className="rounded-xl border border-brand-blue py-2 text-brand-blue">Cartão</button><button className="rounded-xl bg-[#f1f4fb] py-2">Pix</button><button className="rounded-xl bg-[#f1f4fb] py-2">Saldo</button></div>
              <button className="mt-3 w-full rounded-xl bg-brand-blue py-3 font-semibold text-white">Confirmar reserva</button>
            </div>
            <div className="rounded-3xl border border-[#19367c] bg-gradient-to-br from-[#001d58] to-[#011033] p-5 text-white shadow-[0_18px_48px_rgba(2,20,70,0.35)]">
              <div className="mb-3 flex items-center justify-between"><h3 className="text-4xl font-bold">Sala efêmera</h3><p className="text-sm text-zinc-300">Sala privada e segura</p></div>
              <div className="mb-3 inline-flex rounded-full border border-emerald-400 px-3 py-1 text-sm text-emerald-300">● Ao vivo</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-36 rounded-2xl bg-[#2f4679]" />
                <div className="h-36 rounded-2xl bg-[#2f4679]" />
              </div>
              <div className="mt-4 flex items-center justify-between"><div className="flex gap-2 text-xs"><span className="rounded-lg bg-white/10 px-2 py-1">Chat</span><span className="rounded-lg bg-white/10 px-2 py-1">Notas</span><span className="rounded-lg bg-white/10 px-2 py-1">Quadro</span></div><button className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white">Encerrar</button></div>
            </div>
          </div>
        </div>
      </section>

      <p className="text-center text-sm text-[#5d6f9f]">🛡️ Ambiente seguro, pagamentos protegidos e nenhuma gravação por padrão.</p>

      <section className="space-y-8">
        <h2 className="text-center text-5xl font-extrabold text-[#09133b] dark:text-zinc-100">Como funciona</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {howItWorks.map((item) => (
            <article key={item.title} className="text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d6def7] bg-white text-3xl shadow-[0_10px_25px_rgba(31,75,255,0.08)]">{item.icon}</div>
              <p className="mb-2 text-sm font-bold text-brand-blue">{item.step} {item.title}</p>
              <p className="text-sm text-[#4a5b8a]">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-center text-5xl font-extrabold text-[#09133b] dark:text-zinc-100">Para quem é o Peekr</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {useCases.map((item) => (
            <article key={item} className="rounded-2xl border border-[#dce4ff] bg-white p-4 text-center text-lg font-semibold shadow-[0_10px_20px_rgba(31,75,255,0.06)]">
              {item}
            </article>
          ))}
        </div>
        <p className="text-center text-[#5d6f9f]">Educação, carreira, idiomas, negócios, tecnologia e muito mais.</p>
      </section>

      <section className="grid gap-6 rounded-3xl border border-[#103080] bg-gradient-to-r from-[#021a57] to-[#00123f] p-8 text-white lg:grid-cols-[1fr_380px] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-[#4ca1ff]">PRIVACIDADE QUE GERA CONFIANÇA</p>
          <h2 className="mt-2 text-5xl font-extrabold">Efêmero por padrão</h2>
          <p className="mt-3 max-w-xl text-[#c9d9ff]">A sala abre antes do horário, acontece ao vivo e para de aceitar acessos quando a sessão termina. Suas sessões não são gravadas por padrão.</p>
          <ul className="mt-5 grid gap-2 text-[#dce7ff] md:grid-cols-2">
            <li>✅ Sala privada e criptografada</li>
            <li>✅ Acesso restrito ao horário da sessão</li>
            <li>✅ Sem gravações por padrão</li>
          </ul>
        </div>
        <div className="h-52 rounded-2xl bg-[radial-gradient(circle_at_center,#3eb7ff_0%,#0b3e9e_35%,#021647_70%)]" />
      </section>

      <section className="grid gap-6 rounded-3xl border border-[#dce4ff] bg-[#f7f9ff] p-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="text-5xl font-extrabold text-[#09133b]">Pronto para transformar sua presença em impacto?</h2>
          <p className="mt-2 text-lg text-[#5d6f9f]">Crie seu perfil gratuitamente e comece a receber seus primeiros agendamentos.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href="/register" size="lg">Criar meu perfil</Button>
            <Button href="/oathlon" size="lg" variant="ghost" className="border border-[#d6def7] bg-white text-brand-blue hover:text-brand-orange">Ver exemplo de perfil</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-[#dce4ff] bg-white p-4">
            <h3 className="text-lg font-semibold">Visão geral</h3>
            <p className="mt-3 text-[#5d6f9f]">28 sessões realizadas</p>
            <p className="text-4xl font-bold">R$ 5.642</p>
            <p className="text-[#5d6f9f]">Avaliação média 5,0</p>
          </article>
          <article className="rounded-2xl border border-[#dce4ff] bg-white p-4">
            <h3 className="text-lg font-semibold">Próxima sessão</h3>
            <p className="mt-3 font-semibold">Lucas Martins</p>
            <p className="text-[#5d6f9f]">Ter, 14/05 às 14:00</p>
            <button className="mt-4 w-full rounded-xl bg-brand-blue py-3 font-semibold text-white">Entrar na sala</button>
          </article>
        </div>
      </section>
    </div>
  );
}
