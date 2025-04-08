import { Database } from './fixed-types';

export type Shop = Database['public']['Tables']['shops']['Row'];

export type CreateShopInput = Database['public']['Tables']['shops']['Insert'];
export type UpdateShopInput = Database['public']['Tables']['shops']['Update'];
