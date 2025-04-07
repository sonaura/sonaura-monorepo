import { SendCustomerEmailInput } from '@/lib/email/dto/send-customer-email-input.dto';
import { sendCustomerEmail } from '@/lib/email/email.handler';

export async function POST(request: Request) {
  try {
    const sendEmailInput: SendCustomerEmailInput = await request.json();

    const email = await sendCustomerEmail(sendEmailInput);

    return Response.json(await email.json(), {
      status: email.status,
    });
  } catch (e) {
    return Response.json({}, { status: 500 });
  }
}
