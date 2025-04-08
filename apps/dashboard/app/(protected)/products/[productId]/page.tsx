import { DashboardEditProductView } from '@/views/Dashboard/Products/DashboardEditProductView';

export type PageProps = {
  params: Promise<{ productId: string }>;
};

export default async function EditShopPage({ params }: PageProps) {
  const { productId } = await params;
  return <DashboardEditProductView productId={productId} />;
}
