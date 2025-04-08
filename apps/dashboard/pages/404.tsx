import { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Custom404: NextPage = () => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography variant={'h2'}>{'Erreur 404'}</Typography>
    </Container>
  );
};

export default Custom404;
