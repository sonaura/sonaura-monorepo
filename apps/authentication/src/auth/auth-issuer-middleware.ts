import { AppType } from '@/types/app.types';
import { CloudflareStorage } from '@openauthjs/openauth/storage/cloudflare';
import { issuer } from '@openauthjs/openauth';
import { subjects } from '@sonaura/auth';
import { CodeProvider } from '@openauthjs/openauth/provider/code';
import { CodeUI } from '@openauthjs/openauth/ui/code';
import { getUserId } from '@/auth/get-user-id';
import { MiddlewareHandler } from 'hono';
import { sendEmailCode } from '@/email/send-email.handler';

type AllowIssuer = (
  client: { redirectURI: string; clientID: string; audience?: string },
  req: Request,
) => Promise<boolean>;

const authorizedRedirectURI = ['sonaura.fr', 'dashboard-*-sonaura.vercel.app'];
const authorizedClient = ['sonaura-dashboard'];

export const authIssuerMiddleware: MiddlewareHandler<AppType> = async (c) => {
  const storage = CloudflareStorage({
    namespace: c.env.AUTH_KV,
  });

  const allow: AllowIssuer = async ({ redirectURI, clientID }) => {
    const isProd = c.env.ENVIRONMENT === 'production';

    if (!isProd) {
      return true;
    }

    const isAuthorizedClientID = authorizedClient.includes(clientID);

    const clientUrl = new URL(redirectURI);
    const isAuthorizedRedirectURI = authorizedRedirectURI.some((uriPattern) => {
      const regexPattern = uriPattern.replace(/\*/g, '.*');
      const regex = new RegExp(`^${regexPattern}$`);
      return regex.test(clientUrl.hostname);
    });

    return isAuthorizedClientID && isAuthorizedRedirectURI;
  };

  const authIssuer = issuer({
    subjects,
    storage,
    allow,
    providers: {
      code: CodeProvider(
        CodeUI({
          copy: {
            code_info: "We'll send a pin code to your email",
          },
          sendCode: async (claims, code) =>
            sendEmailCode({
              code,
              email: claims.email!,
              context: c,
            }),
          mode: 'email',
        }),
      ),
    },
    async success(ctx, value) {
      let user: { userId: string; role: string } = {
        userId: '',
        role: '',
      };

      if (value.provider === 'code') {
        const { role, id } = await getUserId(value.claims.email!, c);
        user = {
          userId: id,
          role,
        };
      }

      return ctx.subject('user', user);
    },
  });

  return authIssuer.fetch(c.req.raw, c.env);
};
