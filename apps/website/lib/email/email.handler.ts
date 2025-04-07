import { SubscribeNewsletterDto } from '@/lib/email/dto/subscribe-newsletter.dto';
import { getEmailHeaders } from '@/lib/email/utils/email.utils';
import { getWebsiteDomain } from '@/utils/website-domain';
import { AddToListInput } from '@/lib/email/dto/add-to-list-input.dto';
import { formatPhoneNumber } from '@/utils/phone-number';
import { SendMerchantEmailInput } from '@/lib/email/dto/send-merchant-email-input.dto';
import { SendCustomerEmailInput } from '@/lib/email/dto/send-customer-email-input.dto';

const baseUrl = 'https://api.brevo.com/v3';
const merchantEmail = process.env.NEXT_PUBLIC_MERCHANT_EMAIL!;
const merchantName = process.env.NEXT_PUBLIC_MERCHANT_NAME!;

export function subscribeToNewsletter(
  subscribeNewsletterDto: SubscribeNewsletterDto,
): Promise<Response> {
  const url = `${baseUrl}/contacts/doubleOptinConfirmation`;

  const includeListIds = [3];
  const templateId = 2;

  const { email } = subscribeNewsletterDto;

  const websiteDomain = getWebsiteDomain();

  const paylaod = {
    email,
    includeListIds,
    redirectionUrl: websiteDomain,
    templateId,
  };

  return fetch(url, {
    method: 'POST',
    headers: getEmailHeaders(),
    body: JSON.stringify(paylaod),
  });
}

export function addToList(addToListInput: AddToListInput): Promise<Response> {
  const url = `${baseUrl}/contacts`;

  const { firstName, lastName, email, phone, includeListIds } = addToListInput;

  const paylaod = {
    email,
    attributes: {
      PRENOM: firstName,
      NOM: lastName,
      SMS: formatPhoneNumber(phone),
    },
    includeListIds,
    updateEnabled: true,
  };

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(paylaod),
    headers: getEmailHeaders(),
  });
}

export function sendMerchantEmail(
  sendMerchantEmailInput: SendMerchantEmailInput,
): Promise<Response> {
  const url = `${baseUrl}/smtp/email`;

  const { email, message, templateId, firstName, lastName, phone, params } =
    sendMerchantEmailInput;

  const fullName = `${firstName} ${lastName}`;

  const paylaod = {
    to: [{ email: merchantEmail, name: merchantName }],
    replyTo: {
      email,
      name: fullName,
    },
    templateId: templateId,
    params: {
      customerEmail: email,
      customerFullName: fullName,
      phone,
      message,
      params,
    },
  };

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(paylaod),
    headers: getEmailHeaders(),
  });
}

export async function sendCustomerEmail(
  sendCustomerEmailInput: SendCustomerEmailInput,
): Promise<Response> {
  const url = `${baseUrl}/smtp/email`;

  const {
    email,
    message,
    phone,
    templateId,
    includeListIds,
    firstName,
    lastName,
    params,
  } = sendCustomerEmailInput;

  const fullName = `${firstName} ${lastName}`;

  const paylaod = {
    to: [{ email, name: fullName }],
    replyTo: {
      email: merchantEmail,
      name: merchantName,
    },
    templateId: templateId.customer,
    params: {
      websiteUrl: getWebsiteDomain(),
      email,
      fullName,
      message,
      params,
    },
  };

  try {
    if (includeListIds) {
      await addToList({
        email,
        firstName,
        lastName,
        phone,
        includeListIds,
      });
    }
  } catch (error) {
    throw new Error(
      `Error while adding email ${email} to listId ${includeListIds?.toString()} `,
    );
  }

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(paylaod),
    headers: getEmailHeaders(),
  });
}
