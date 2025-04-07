import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@sonaura/ui/components/breadcrumb';
import Link from 'next/link';
import { Product } from '@sonaura/database/types/products';
import { Category } from '@sonaura/database/types/categories';

export interface ProductBreadcrumbProps {
  product: Product;
  category: Category;
}

export const ProductBreadcrumb = ({
  product,
  category,
}: ProductBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Sonaura</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${category.slug}`}>{category.name}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${category.slug}/${product.slug}`}>
              {product.name}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
