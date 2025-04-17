import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import '@sonaura/ui/styles/globals.css';
import { auth, login } from '@/auth';
import { Header } from '@/components/header';
import { LogoutButton } from '@/components/logout-button';
import Box from '@mui/material/Box';
import { rolesEnum } from '@sonaura/database/schema';
import Typography from '@mui/material/Typography';

type UserRole = (typeof rolesEnum.enumValues)[number];

const allowedRoles: Array<UserRole> = ['admin', 'editor'];

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const subject = await auth();

  if (subject === false) {
    return await login();
  }

  console.log('subject', subject);

  if (!allowedRoles.includes(subject.properties.role as UserRole)) {
    return (
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
        height={'100vh'}
      >
        <Typography variant={'h4'}>Vous n'êtes pas autorisé.</Typography>
        <LogoutButton />
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Header>
          <LogoutButton />
        </Header>
        <Box component={'main'} margin={'2rem'}>
          {children}
        </Box>
      </Box>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
    </>
  );
}
