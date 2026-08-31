import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#dfe6f4] bg-white py-5">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3 px-4 text-sm text-[#68799f] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-extrabold text-brand-blue">
            Peek<span className="text-brand-orange">r</span>
          </Link>
          <span className="hidden h-4 border-l border-[#d7dfed] sm:block" />
          <p>Perfis, horários e conhecimento em um só lugar.</p>
        </div>
        <nav className="flex gap-4">
          <a href="#" className="hover:text-brand-blue">
            Termos
          </a>
          <a href="#" className="hover:text-brand-blue">
            Privacidade
          </a>
          <a href="#" className="hover:text-brand-blue">
            Contato
          </a>
        </nav>
      </div>
    </footer>
  );
}
