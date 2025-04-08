'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ShopsTable from '@/components/dashboard/Shops/ShopsTable';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

export const DashboardShopView = () => {
  const router = useRouter();

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h1">{'Magasins'}</Typography>
          <Button
            variant="contained"
            onClick={() => {
              router.push('/shops/new');
            }}
          >
            {'Ajouter'}
          </Button>
        </Grid>
        <Grid item xs={12} height={'50vh'}>
          <ShopsTable />
        </Grid>
      </Grid>
    </Box>
  );
};
