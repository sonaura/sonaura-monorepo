import { createClient } from '@sonaura/database/server';
import Link from 'next/link';
import { Card, CardContent } from '@sonaura/ui/components/card';
import Image from 'next/image';
import { Price } from '@/components/price';
import type { Product } from '@sonaura/database/types';

export interface SingleProductProps {
  product: Product;
}

export const SingleProduct = async ({ product }: SingleProductProps) => {
  const supabaseClient = await createClient();

  const { bucket, file } = product.mainImage;

  const {
    data: { publicUrl },
  } = supabaseClient.storage.from(bucket).getPublicUrl(file, {
    transform: {
      quality: 75,
      width: 800,
      height: 800,
    },
  });

  return (
    <Link
      key={product.id}
      href={`/${product.categories?.slug}/${product.slug}`}
      className={'w-full h-full'}
    >
      <Card className="w-full h-full hover:shadow-lg transition-all duration-300">
        <CardContent className="h-full flex flex-col justify-center items-center gap-3 p-6 overflow-hidden">
          <div className={'relative aspect-square w-full'}>
            <Image
              src={publicUrl}
              alt={product.name}
              fill
              className={'object-contain'}
            />
          </div>

          <h3 className="text-lg font-medium">{product.name}</h3>

          {product.price && <Price price={product.price} />}
          {product.fromPrice && (
            <Price
              price={product.fromPrice}
              formatting={(price) => `À partir de ${price}`}
            />
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
