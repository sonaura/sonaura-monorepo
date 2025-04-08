import { Database } from './fixed-types';

export type Installation = Database['public']['Tables']['installations']['Row'];

export type CreateInstallationInput =
  Database['public']['Tables']['installations']['Insert'];
export type UpdateInstallationInput =
  Database['public']['Tables']['installations']['Update'];
