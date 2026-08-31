import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

const profiles = [
  {
    username: "athlon",
    name: "Athlon",
    title: "Especialista em Game Design",
    rating: "4,9",
    tags: ["Game Design", "Balanceamento", "Progressão"],
  },
  {
    username: "lia-produto",
    name: "Lia Martins",
    title: "Mentora de Produto Digital",
    rating: "4,8",
    tags: ["Produto", "Discovery", "Carreira"],
  },
  {
    username: "marcos-ux",
    name: "Marcos Silva",
    title: "Consultor de UX e Pesquisa",
    rating: "5,0",
    tags: ["UX", "Pesquisa", "Portfólio"],
  },
];

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLocaleLowerCase("pt-BR");
  const results = profiles.filter(
    (profile) =>
      !query ||
      `${profile.name} ${profile.title} ${profile.tags.join(" ")}`
        .toLocaleLowerCase("pt-BR")
        .includes(query),
  );

  return (
    <div className="profile-frame p-5 sm:p-7 lg:p-9">
      <header className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">
          Explorar
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#091333] sm:text-4xl">
          Encontre o perfil certo para o seu próximo passo
        </h1>
        <p className="mt-3 leading-7 text-[#68799f]">
          Descubra especialistas, conheça seus Peeks e escolha um horário
          diretamente no perfil.
        </p>
      </header>
      {q && (
        <p className="mt-6 text-sm font-semibold text-[#53688f]">
          Resultados para “{q}”
        </p>
      )}
      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {results.map((profile) => (
          <Link
            key={profile.username}
            href={`/${profile.username}`}
            className="group rounded-3xl border border-[#dce5f5] bg-white p-5 transition hover:-translate-y-1 hover:border-[#9eb8ed] hover:shadow-xl"
          >
            <div className="flex items-start gap-4">
              <Avatar
                name={profile.name}
                className="h-16 w-16 shrink-0 text-xl"
              />
              <div className="min-w-0">
                <h2 className="text-xl font-extrabold text-[#091333] group-hover:text-brand-blue">
                  {profile.name}{" "}
                  <span className="text-sm text-brand-blue">✓</span>
                </h2>
                <p className="mt-1 text-sm leading-5 text-[#68799f]">
                  {profile.title}
                </p>
                <p className="mt-2 text-sm font-bold text-[#40547c]">
                  <span className="text-brand-orange">★</span> {profile.rating}
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-[#e8edf7] pt-4 text-sm font-bold text-brand-blue">
              <span>Ver perfil e horários</span>
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>
      {!results.length && (
        <div className="mt-7 rounded-2xl border border-dashed border-[#cfd9ed] p-8 text-center text-[#68799f]">
          Nenhum perfil encontrado. Tente outro nome ou especialidade.
        </div>
      )}
    </div>
  );
}
