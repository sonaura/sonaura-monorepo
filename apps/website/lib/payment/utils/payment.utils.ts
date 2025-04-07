import { env } from '@/env';

export const getPaymentHeaders = (): Headers => {
  const key = env.NEXT_PUBLIC_PAYPLUG_SECRET_KEY;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${key}`);
  headers.append('PayPlug-Version', '2019-08-06');

  return headers;
};
