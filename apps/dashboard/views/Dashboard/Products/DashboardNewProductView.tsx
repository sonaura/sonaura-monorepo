'use client';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ProductForm, {
  InsertOrUpdateProduct,
} from '@/components/dashboard/Products/ProductForm';
import { initialValues } from '@/components/dashboard/Products/ProductForm/product.validator';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createClient } from '@sonaura/database/client';
import { CreateProductInput } from '@sonaura/database/types';

export const DashboardNewProductView = () => {
  const router = useRouter();
  const supabaseClient = createClient();

  const create = async (product: CreateProductInput) => {
    const { error } = await supabaseClient.from('products').insert([product]);

    if (error) {
      console.log(error);
      toast.error('products.add.error');
      return;
    }
    toast.success('products.add.success');
    router.push('/products');
  };

  const sanitizeNumber = (number: number): number => {
    try {
      if (typeof number === 'string') {
        number = parseInt(number);
      }
    } catch (e) {}

    return number;
  };

  const onSubmit = (values: InsertOrUpdateProduct) => {
    const {
      name,
      description,
      fromPrice,
      price,
      quantity,
      slug,
      categoryId,
      shopId,
      mainImage,
    } = values;

    const input = {
      name,
      description,
      fromPrice: fromPrice && sanitizeNumber(fromPrice),
      price: price && sanitizeNumber(price),
      quantity: quantity && sanitizeNumber(quantity),
      slug,
      categoryId,
      shopId: shopId === '' ? null : shopId,
      mainImage,
    };

    create(input as CreateProductInput);
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => {
          router.push('/products');
        }}
      >
        {'Retour'}
      </Button>
      <Typography sx={{ marginY: '1rem' }} variant="h1">
        {'Nouveau produit'}
      </Typography>
      <ProductForm
        formMode={'create'}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Box>
  );
};
