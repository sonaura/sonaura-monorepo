import { Montserrat } from 'next/font/google';

import React, { ReactNode } from 'react';

import '@sonaura/ui/styles/globals.css';
import Page from '@/components/system/Page';

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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="robots" content="noindex" />
        <title>Sonaura</title>
      </head>
      <body
        className={`${montserrat.className} antialiased min-h-screen text-balance`}
      >
        <Page>{children}</Page>
      </body>
    </html>
  );
}
