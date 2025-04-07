import { Montserrat } from 'next/font/google';

import '@sonaura/ui/globals.css';
import { Providers } from '@/components/providers';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { CartSidebar } from '@/components/cart-sidebar';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BreakpointsHelper } from '@/components/breakpoint-helper';
import { Analytics } from '@/components/analytics';

export const metadata: Metadata = {
  title: {
    template: '%s | Sonaura',
    default: 'Distributeur Bang & Olufsen Auvergne Rhône-Alpes | Sonaura',
  },
};

const montserrat = Montserrat({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${montserrat.className} antialiased min-h-screen text-balance`}
      >
        <Providers>
          <CartSidebar>
            <Header />
            {children}
            <Footer />
            <BreakpointsHelper />
            <Analytics />
          </CartSidebar>
        </Providers>
      </body>
    </html>
  );
}
