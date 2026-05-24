import Image from "next/image";

const detailImages = [
  { src: "/mockups/overview-card.png", alt: "Card de visão geral e próxima sessão" },
  { src: "/mockups/profile-schedule.png", alt: "Card de perfil com próximos horários" },
  { src: "/mockups/payment-card.png", alt: "Card de reserva e pagamento" },
  { src: "/mockups/room-card.png", alt: "Card da sala efêmera" },
  { src: "/mockups/lock-visual.png", alt: "Visual de privacidade e criptografia" },
];

export default function HomePage() {
  return (
    <div className="space-y-10 pb-10">
      <section className="rounded-3xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <Image
          src="/mockups/home-reference-full.png"
          alt="Mockup completo da home da Peekr"
          width={1884}
          height={3328}
          className="h-auto w-full rounded-2xl"
          priority
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-blue">Detalhes incorporados do mockup</h2>
        <p className="text-zinc-600 dark:text-zinc-300">
          Estes recortes foram incorporados diretamente como solicitado. Os links continuam em azul e ficam laranja no hover.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {detailImages.map((item) => (
            <figure key={item.src} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <Image src={item.src} alt={item.alt} width={1884} height={1364} className="h-auto w-full" />
              <figcaption className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300">{item.alt}</figcaption>
            </figure>
          ))}
        </div>

        <div className="pt-2 text-sm">
          <a href="/login" className="text-brand-blue transition hover:text-brand-orange">Entrar</a>
          <span className="mx-2 text-zinc-400">•</span>
          <a href="/register" className="text-brand-blue transition hover:text-brand-orange">Criar meu perfil</a>
        </div>
      </section>
    </div>
  );
}
