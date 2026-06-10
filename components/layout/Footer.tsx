export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm text-zinc-600 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-brand-blue">Peekr</p>
          <p>Sessões privadas ao vivo para aprender, orientar e resolver.</p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-brand-blue transition hover:text-brand-orange">Termos</a>
          <a href="#" className="text-brand-blue transition hover:text-brand-orange">Privacidade</a>
          <a href="#" className="text-brand-blue transition hover:text-brand-orange">Contato</a>
        </div>
      </div>
    </footer>
  );
}
