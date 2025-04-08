import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CategoryTable from 'components/dashboard/Categories/CategoryTable';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

const DashboardCategoryView: React.FC = () => {
  const router = useRouter();

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h1">{'Catégories'}</Typography>
          <Button
            variant="contained"
            onClick={() => {
              router.push('/categories/new');
            }}
          >
            {'Ajouter'}
          </Button>
        </Grid>
        <Grid item xs={12} height={'50vh'}>
          <CategoryTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardCategoryView;
