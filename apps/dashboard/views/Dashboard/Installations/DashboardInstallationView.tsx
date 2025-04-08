'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import InstallationTable from '@/components/dashboard/Installations/InstallationTable';

export const DashboardInstallationView = () => {
  const router = useRouter();

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h1">{'Réalisations'}</Typography>
          <Button
            variant="contained"
            onClick={() => {
              router.push('/installations/new');
            }}
          >
            {'Ajouter'}
          </Button>
        </Grid>
        <Grid item xs={12} height={'50vh'}>
          <InstallationTable />
        </Grid>
      </Grid>
    </Box>
  );
};
