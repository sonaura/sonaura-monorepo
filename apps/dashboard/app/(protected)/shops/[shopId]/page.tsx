import { DashboardEditShopView } from '@/views/Dashboard/Shops/DashboardEditShopView';

export type PageProps = {
  params: Promise<{ shopId: string }>;
};

export default async function EditShopPage({ params }: PageProps) {
  const { shopId } = await params;
  return <DashboardEditShopView shopId={shopId} />;
}
