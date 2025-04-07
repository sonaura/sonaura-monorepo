export const getEmailHeaders = (): Headers => {
  const apiKey = process.env.NEXT_PUBLIC_SIB_API_KEY!;

  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  headers.append('api-key', apiKey);
  return headers;
};
