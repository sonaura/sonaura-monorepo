import type { Database } from './fixed-types';

export type Product = Database['public']['Tables']['products']['Row'] & {
  categories: {
    slug: string;
  };
};
