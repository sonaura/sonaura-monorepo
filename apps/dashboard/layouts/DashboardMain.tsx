'use client';

import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

import Container from '@/components/system/Container';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@sonaura/database/client';

interface Props {
  colorInvert?: boolean;
}

export const DashboardMain = ({ children }: PropsWithChildren<Props>) => {
  const path = usePathname();
  const router = useRouter();
  const supabaseClient = createClient();

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      console.error(error);
    } else {
      router.push('/login');
    }
  };

  return (
    <Box>
      <AppBar position={'sticky'} color={'secondary'}>
        <Container paddingY={1}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={1}
          >
            <Box
              display={'flex'}
              component="a"
              href="/"
              title={'Sonaura'}
              width={{ xs: 130, md: 200 }}
              sx={{ marginY: '1rem' }}
            >
              <Box
                component={'img'}
                alt={'config.website'}
                src={'/assets/logos/logo.svg'}
                height={1}
                width={1}
              />
            </Box>
            <Box>
              <Link
                sx={{ paddingX: { md: 0.8, lg: 2 } }}
                underline="none"
                component="a"
                href={'/products'}
                color={'text.primary'}
                fontWeight={path?.includes('/products') ? 700 : 400}
              >
                {'Produits'}
              </Link>
              <Link
                sx={{ paddingX: { md: 0.8, lg: 2 } }}
                underline="none"
                component="a"
                href={'/categories'}
                color={'text.primary'}
                fontWeight={path?.includes('/categories') ? 700 : 400}
              >
                {'Catégories'}
              </Link>
              <Link
                sx={{ paddingX: { md: 0.8, lg: 2 } }}
                underline="none"
                component="a"
                href={'/installations'}
                color={'text.primary'}
                fontWeight={path?.includes('/installations') ? 700 : 400}
              >
                {'Réalisations'}
              </Link>
              <Link
                sx={{ paddingX: { md: 0.8, lg: 2 } }}
                underline="none"
                component="a"
                href={'/shops'}
                color={'text.primary'}
                fontWeight={path?.includes('/shops') ? 700 : 400}
              >
                {'Magasins'}
              </Link>
              <Button onClick={signOut} sx={{ paddingX: { md: 0.8, lg: 2 } }}>
                {'Se déconnecter'}
              </Button>
            </Box>
          </Box>
        </Container>
      </AppBar>
      <Box component={'main'} margin={'2rem'}>
        {children}
      </Box>
    </Box>
  );
};
