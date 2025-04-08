import { DashboardEditInstallationView } from '@/views/Dashboard/Installations/DashboardEditInstallationView';

export type PageProps = {
  params: Promise<{ installationId: string }>;
};

export default async function EditShopPage({ params }: PageProps) {
  const { installationId } = await params;
  return <DashboardEditInstallationView installationId={installationId} />;
}
