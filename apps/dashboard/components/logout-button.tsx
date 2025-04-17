import { logout } from '@/auth';
import Button from '@mui/material/Button';

export const LogoutButton = () => {
  return (
    <form action={logout}>
      <Button type={'submit'} sx={{ paddingX: { md: 0.8, lg: 2 } }}>
        {'Se déconnecter'}
      </Button>
    </form>
  );
};
