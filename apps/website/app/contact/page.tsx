import { HeroText } from '@/components/hero-text';
import { ContactForm } from '@/components/contact-form';
import { createClient } from '@sonaura/database/server';
import { ShopInfo } from '@/components/shops-info';

export default async function ContactPage() {
  const supabaseClient = await createClient();

  const { data: shops } = await supabaseClient.from('shops').select('*');

  return (
    <div className={'flex flex-col gap-12'}>
      <div className={'p-4 md:p-8 bg-tertiary'}>
        <HeroText
          title={
            <h1 className={'text-4xl font-semibold leading-snug'}>
              Contactez-nous
            </h1>
          }
          subtitle={
            <p className={'text-xl font-light text-gray-700'}>
              Nos experts Bang & Olufsen répondent à vos questions et vous
              aident à gagner du temps.
            </p>
          }
        />
      </div>
      <div className={'max-w-7xl m-auto w-full p-4 lg:p-8'}>
        {shops && <ShopInfo shops={shops} />}
      </div>
      <div className={'p-4 md:p-8 flex flex-col gap-6 max-w-7xl m-auto'}>
        <h2 className={'text-2xl md:text-3xl font-semibold leading-snug'}>
          Vous ne trouvez pas de réponse à vos questions ?
        </h2>
        <ContactForm />
      </div>
    </div>
  );
}
