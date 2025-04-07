import { createClient } from '@sonaura/database/server';
import { notFound } from 'next/navigation';
import {
  ProductCarousel,
  ProductBreadcrumb,
  ProductDescription,
  ProductVariantPicker,
  VariantProvider,
} from './components';
import type { Metadata } from 'next';

export type PageProps = {
  params: Promise<{ categorySlug: string; productSlug: string }>;
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const supabaseClient = await createClient();
  const { categorySlug, productSlug } = await props.params;

  const { data: category } = await supabaseClient
    .from('categories')
    .select('*')
    .limit(1)
    .eq('slug', categorySlug)
    .maybeSingle();

  if (!category) {
    return {};
  }

  const { data: product } = await supabaseClient
    .from('products')
    .select('*, categories (slug)')
    .eq('categoryId', category.id)
    .eq('slug', productSlug)
    .maybeSingle();

  if (!product) {
    return {};
  }

  return {
    title: `${product.name}`,
  };
};

export default async function ProductPage({ params }: PageProps) {
  const supabaseClient = await createClient();

  const { categorySlug, productSlug } = await params;

  const { data: category } = await supabaseClient
    .from('categories')
    .select('*')
    .limit(1)
    .eq('slug', categorySlug)
    .maybeSingle();

  if (!category) {
    return notFound();
  }

  const { data: product } = await supabaseClient
    .from('products')
    .select('*, categories (slug)')
    .eq('categoryId', category.id)
    .eq('slug', productSlug)
    .maybeSingle();

  if (!product) {
    return notFound();
  }

  return (
    <VariantProvider>
      <section className={'flex flex-col gap-6 p-4 md:p-8'}>
        <ProductBreadcrumb product={product} category={category} />
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-6'}>
          <ProductCarousel product={product} />
          <div className={'flex flex-col gap-4'}>
            <ProductDescription product={product} />
            <ProductVariantPicker product={product} />
          </div>
        </div>
      </section>
    </VariantProvider>
  );
}
