import { CreatePaymentInput } from '@/lib/payment/dto/create-payment-input.dto';
import { PageUrl } from '@/routes/page';
import { getPaymentHeaders } from '@/lib/payment/utils/payment.utils';

const baseUrl = 'https://api.payplug.com/v1';

export function makePayment(
  createPaymentInput: CreatePaymentInput,
): Promise<Response> {
  const url = `${baseUrl}/payments`;

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    city,
    postalCode,
    amount,
  } = createPaymentInput;

  const formattedAmount = amount * 100;

  const addressInput = {
    first_name: firstName,
    last_name: lastName,
    email,
    mobile_phone_number: phoneNumber,
    address1: address,
    postcode: postalCode,
    city: city,
    country: 'FR',
    language: 'fr',
  };

  const payload = {
    amount: formattedAmount,
    currency: 'EUR',
    billing: {
      ...addressInput,
    },
    shipping: {
      ...addressInput,
      delivery_type: 'SHIP_TO_STORE',
    },
    hosted_payment: {
      cancel_url: PageUrl.CHECKOUT_PAGE,
      return_url: PageUrl.SUCCESS_PAYMENT_PAGE,
    },
  };

  return fetch(url, {
    method: 'POST',
    headers: getPaymentHeaders(),
    mode: 'no-cors',
    body: JSON.stringify(payload),
  });
}
