import { DashboardEditCategoryView } from '@/views/Dashboard/Categories/DashboardEditCategoryView';

export type PageProps = {
  params: Promise<{ categoryId: string }>;
};

export default async function EditShopPage({ params }: PageProps) {
  const { categoryId } = await params;
  return <DashboardEditCategoryView categoryId={categoryId} />;
}
