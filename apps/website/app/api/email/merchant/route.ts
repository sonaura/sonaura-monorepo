import { SendMerchantEmailInput } from '@/lib/email/dto/send-merchant-email-input.dto';
import { sendMerchantEmail } from '@/lib/email/email.handler';

export async function POST(request: Request) {
  try {
    const sendEmailInput: SendMerchantEmailInput = await request.json();

    const email = await sendMerchantEmail(sendEmailInput);

    return Response.json(await email.json(), {
      status: email.status,
    });
  } catch (e) {
    return Response.json({}, { status: 500 });
  }
}
