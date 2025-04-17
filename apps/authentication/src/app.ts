import { Hono } from 'hono';
import { AppType } from '@/types/app.types';
import { authIssuerMiddleware } from '@/auth/auth-issuer-middleware';

export const app = new Hono<AppType>();
app.use(authIssuerMiddleware);
