import { env } from '@/env';

export const getEmailHeaders = (): Headers => {
  const apiKey = env.NEXT_PUBLIC_SIB_API_KEY;

  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  headers.append('api-key', apiKey);
  return headers;
};
