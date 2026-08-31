import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#dfe6f4] bg-white/95 backdrop-blur">
      <div className="mx-auto grid min-h-16 w-full max-w-[1500px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:gap-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-2xl font-extrabold tracking-tight text-[#0b4bff]"
          aria-label="Peekr — início"
        >
          Peek<span className="text-brand-orange">r</span>
        </Link>

        <form action="/explore" className="mx-auto w-full max-w-xl">
          <label htmlFor="profile-search" className="sr-only">
            Buscar perfis
          </label>
          <div className="relative">
            <span
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7384a6]"
              aria-hidden="true"
            >
              ⌕
            </span>
            <input
              id="profile-search"
              name="q"
              type="search"
              placeholder="Buscar perfis"
              className="min-h-10 w-full rounded-full border border-[#d6e0f2] bg-[#f7f9fd] pl-10 pr-4 text-sm text-[#1d315d] placeholder:text-[#8492ad] focus:bg-white"
            />
          </div>
        </form>

        <details className="group relative">
          <summary className="flex min-h-10 cursor-pointer list-none items-center gap-2 rounded-full border border-[#d6e0f2] bg-white px-3 text-sm font-bold text-[#274477] hover:bg-blue-50">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue text-xs text-white">
              A
            </span>
            <span className="hidden sm:inline">Conta</span>
            <span className="text-xs">⌄</span>
          </summary>
          <nav
            className="absolute right-0 top-[calc(100%+8px)] hidden w-52 overflow-hidden rounded-2xl border border-[#dfe6f4] bg-white p-2 shadow-xl group-open:block"
            aria-label="Menu da conta"
          >
            <AccountLink href="/settings" label="Conta" icon="👤" />
            <AccountLink href="/messages" label="Mensagens" icon="💬" />
            <AccountLink href="/notifications" label="Notificações" icon="🔔" />
            <div className="my-1 border-t border-[#e8edf7]" />
            <AccountLink href="/login" label="Sair" icon="↪" />
          </nav>
        </details>
      </div>
    </header>
  );
}

function AccountLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#40547c] hover:bg-blue-50 hover:text-brand-blue"
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </Link>
  );
}
