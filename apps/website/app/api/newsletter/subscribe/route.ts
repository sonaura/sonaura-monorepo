import { subscribeToNewsletter } from '@/lib/email/email.handler';
import { SubscribeNewsletterDto } from '@/lib/email/dto/subscribe-newsletter.dto';

export async function POST(request: Request) {
  try {
    const subscribeNewsletterDto: SubscribeNewsletterDto = await request.json();

    const subscription = await subscribeToNewsletter(subscribeNewsletterDto);

    if (subscription.status === 204) {
      return Response.json({}, { status: 204 });
    }

    return Response.json(await subscription.json(), {
      status: subscription.status,
    });
  } catch (e) {
    return Response.json({}, { status: 500 });
  }
}
