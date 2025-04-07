import { CreatePaymentInput } from '@/lib/payment/dto/create-payment-input.dto';
import { SendCustomerEmailInput } from '@/lib/email/dto/send-customer-email-input.dto';
import { makePayment } from '@/lib/payment/payment.handler';
import { sendCustomerEmail } from '@/lib/email/email.handler';

export async function POST(request: Request) {
  try {
    const createPaymentInput: CreatePaymentInput = await request.json();

    const payment = await makePayment(createPaymentInput);

    const sendEmailInput: SendCustomerEmailInput = {
      firstName: createPaymentInput.firstName,
      lastName: createPaymentInput.lastName,
      email: createPaymentInput.email,
      message: '',
      phone: createPaymentInput.phoneNumber,
      templateId: {
        customer: 10,
        merchant: 11,
      },
      params: {
        products: createPaymentInput.products,
      },
    };

    await sendCustomerEmail(sendEmailInput);
    const body = await payment.json();
    return Response.json(body, {
      status: payment.status,
    });
  } catch (e) {
    return Response.json({}, { status: 500 });
  }
}
