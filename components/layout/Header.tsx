import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { routes } from "@/lib/routes";

export function Header() {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={routes.home} className="text-xl font-bold text-zinc-100">Peek<span className="text-brand-orange">r</span></Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link href={routes.home} className="text-sm text-zinc-300 hover:text-white">Início</Link>
          <Link href={routes.profile("oathlon")} className="text-sm text-zinc-300 hover:text-white">Explorar</Link>
          <Link href={routes.login} className="text-sm text-zinc-300 hover:text-white">Entrar</Link>
          <Button href={routes.register} size="sm">Criar perfil</Button>
        </nav>
      </div>
    </header>
  );
}
