import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/Button";
import { routes } from "@/lib/routes";

export function Header() {
  return (
    <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={routes.home} className="text-xl font-bold">
          <span className="text-brand-blue">Peek</span>
          <span className="text-brand-orange">r</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link href={routes.home} className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Início</Link>
          <Link href={routes.profile("oathlon")} className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Explorar</Link>
          <Link href={routes.login} className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">Entrar</Link>
          <ThemeToggle />
          <Button href={routes.register} size="sm">Criar perfil</Button>
        </nav>
      </div>
    </header>
  );
}
