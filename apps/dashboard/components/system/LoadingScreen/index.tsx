import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const LoadingScreen: React.FC = () => {
  return (
    <Box
      width={'100%'}
      height={'75vh'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Typography variant={'body1'} sx={{ marginBottom: '2rem' }}>
        {'loading'}
      </Typography>
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;
