export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-bold text-brand-blue">Peekr</h1>
      <p className="text-lg text-slate-700 dark:text-slate-300">Venda sua presença. Não um curso.</p>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Base inicial do MVP pronta para perfis, agenda, pagamento e salas efêmeras.
      </p>
    </main>
  );
}
