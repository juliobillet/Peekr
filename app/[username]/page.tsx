import type { Metadata } from "next";
import { ProfileTemplate } from "@/components/profile/ProfileTemplate";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const displayName = username.toLowerCase() === "athlon" ? "Athlon" : username;

  return {
    title: `${displayName} | Peekr`,
    description: `Conheça o perfil de ${displayName} e reserve um horário.`,
  };
}

export default async function ProfilePage({
  params,
  searchParams,
}: ProfilePageProps) {
  const { username } = await params;
  const { tab } = await searchParams;

  return <ProfileTemplate username={username} initialTab={tab} />;
}
