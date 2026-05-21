export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-zinc-200">Peekr</p>
          <p>Sessões privadas ao vivo para aprender, orientar e resolver.</p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-zinc-200">Termos</a>
          <a href="#" className="hover:text-zinc-200">Privacidade</a>
          <a href="#" className="hover:text-zinc-200">Suporte</a>
        </div>
      </div>
    </footer>
  );
}
