import { Database } from './fixed-types';

export type Category = Database['public']['Tables']['categories']['Row'];

export type CreateCategoryInput =
  Database['public']['Tables']['categories']['Insert'];

export type UpdateCategoryInput =
  Database['public']['Tables']['categories']['Update'];
