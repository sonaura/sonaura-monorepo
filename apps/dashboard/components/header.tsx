'use client';

import Container from '@/components/system/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';

export const Header = ({ children }: PropsWithChildren) => {
  const path = usePathname();

  return (
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
          <Box display={'flex'} alignItems={'center'}>
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
            {children}
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};
