import ArrowBack from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import ShopForm, {
  InsertOrUpdateShop,
} from 'components/dashboard/Shops/ShopsForm';
import { initialValues } from 'components/dashboard/Shops/ShopsForm/shops.validator';
import { createClient } from '@sonaura/database/client';
import { CreateShopInput } from '@sonaura/database/types';

const DashboardNewShopView: React.FC = () => {
  const router = useRouter();
  const supabaseClient = createClient();

  const create = async (shop: CreateShopInput) => {
    const { error } = await supabaseClient.from('shops').insert([shop]);

    if (error) {
      console.log(error);
      toast.error("Erreur lors de l'ajout du magasin");
      return;
    }
    toast.success('Magasin ajouté');
    router.push('/shops');
  };

  const onSubmit = (values: InsertOrUpdateShop) => {
    const {
      city,
      address,
      postalCode,
      country,
      phoneNumber,
      email,
      googleMapsUrl,
    } = values;

    const input = {
      city,
      address,
      postalCode,
      country,
      phoneNumber,
      email,
      googleMapsUrl,
    };

    create(input);
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => {
          router.push('/shops');
        }}
      >
        {'Retour'}
      </Button>
      <Typography sx={{ marginY: '1rem' }} variant="h1">
        {'Nouveau magasins'}
      </Typography>
      <ShopForm
        formMode={'create'}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Box>
  );
};

export default DashboardNewShopView;
