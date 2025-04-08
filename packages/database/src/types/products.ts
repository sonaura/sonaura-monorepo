import type { Database } from './fixed-types';

export type Product = Database['public']['Tables']['products']['Row'] & {
  categories: {
    slug: string;
  };
};

export type CreateProductInput =
  Database['public']['Tables']['products']['Insert'];

export type UpdateProductInput =
  Database['public']['Tables']['products']['Update'];
