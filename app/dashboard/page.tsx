import { DashboardProfile } from "@/components/dashboard/DashboardProfile";

type DashboardPageProps = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const { tab } = await searchParams;

  return <DashboardProfile initialTab={tab} />;
}
