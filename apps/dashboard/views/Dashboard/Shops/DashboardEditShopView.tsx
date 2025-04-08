'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Delete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ShopForm, {
  InsertOrUpdateShop,
} from '@/components/dashboard/Shops/ShopsForm';
import { Shop, UpdateShopInput } from '@sonaura/database/types';
import { createClient } from '@sonaura/database/client';

export type DashboardEditShopViewProps = {
  shopId: string;
};

export const DashboardEditShopView = ({
  shopId,
}: DashboardEditShopViewProps) => {
  const router = useRouter();

  const supabaseClient = createClient();

  const [shop, setShop] = useState<Shop | null>(null);

  const fetchShop = useCallback(async () => {
    const { data } = await supabaseClient
      .from('shops')
      .select('*')
      .eq('id', shopId)
      .single();

    if (data) {
      setShop(data);
    }
  }, [shopId]);

  useEffect(() => {
    fetchShop();
  }, [fetchShop]);

  const update = async (shop: UpdateShopInput) => {
    const { error } = await supabaseClient
      .from('shops')
      .update({
        ...shop,
      })
      .eq('id', shopId);

    if (error) {
      console.log(error);
      toast.error('Erreur lors de la mise à jour du magasin');
      return;
    }
    toast.success('Magasin mis à jour');
    router.push('/shops');
  };

  const remove = async () => {
    const { error } = await supabaseClient
      .from('shops')
      .delete()
      .eq('id', shopId);

    if (error) {
      console.log(error);
      toast.error('Erreur lors de la suppression du magasin');
      return;
    }
    toast.success('Magasin supprimé');
    router.push('/shops');
  };

  const onSubmit = (values: InsertOrUpdateShop) => {
    const {
      id,
      city,
      address,
      postalCode,
      country,
      phoneNumber,
      email,
      googleMapsUrl,
    } = values;

    const input = {
      id,
      city,
      address,
      postalCode,
      country,
      phoneNumber,
      email,
      googleMapsUrl,
    };

    update(input);
  };

  const rightButtons = (
    <Button
      variant={'outlined'}
      disabled={shopId === null}
      onClick={remove}
      endIcon={<Delete />}
      color="error"
    >
      {'Supprimer'}
    </Button>
  );

  return (
    <Box>
      <Button
        sx={{ marginBottom: '1rem' }}
        startIcon={<ArrowBack />}
        onClick={() => {
          router.push('/shops');
        }}
      >
        {'Retour'}
      </Button>
      {shop ? (
        <ShopForm
          formMode={'edit'}
          initialValues={shop}
          onSubmit={onSubmit}
          rightButtons={rightButtons}
        />
      ) : (
        false
      )}
    </Box>
  );
};
