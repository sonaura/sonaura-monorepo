import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import '@sonaura/ui/styles/globals.css';
import { createClient } from '@sonaura/database/server';
import { redirect } from 'next/navigation';
import { DashboardMain } from '@/layouts/DashboardMain';

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const supabaseClient = await createClient();

  const { data } = await supabaseClient.auth.getUser();

  if (!data.user) {
    return redirect('/login');
  }

  return (
    <>
      <DashboardMain>{children}</DashboardMain>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
    </>
  );
}
