import { Resend } from 'resend';
import { Context } from 'hono';
import { AppType } from '@/types/app.types';
import { SonauraSendCodeEmail } from '@sonaura/transactional/send-code';

export const sendEmailCode = async ({
  code,
  email,
  context,
}: {
  code: string;
  email: string;
  context: Context<AppType>;
}) => {
  const resend = new Resend(context.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: 'Sonaura <authentication@sonaura.fr>',
    to: [email],
    subject: 'Votre code de confirmation',
    react: <SonauraSendCodeEmail validationCode={code} />,
  });

  if (error) {
    throw new Error(error.message);
  }
};
