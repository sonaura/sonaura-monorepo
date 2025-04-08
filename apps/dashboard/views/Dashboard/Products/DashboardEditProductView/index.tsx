import ArrowBack from '@mui/icons-material/ArrowBack';
import Delete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ProductForm, {
  InsertOrUpdateProduct,
} from 'components/dashboard/Products/ProductForm';
import VariantsDialog from 'components/dashboard/Products/Variants/VariantsDialog';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import type { Product, UpdateProductInput } from '@sonaura/database/types';
import { createClient } from '@sonaura/database/client';

const DashboardEditProductView: React.FC = () => {
  const router = useRouter();
  const productId = `${router.query['id']}`;

  const [product, setProduct] = useState<Product | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const supabaseClient = createClient();

  const handleModal = () => {
    setModal((prev) => !prev);
  };

  const fetchProduct = useCallback(async () => {
    const { data } = await supabaseClient
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();
    if (data) {
      setProduct(data as Product);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const update = async (product: UpdateProductInput) => {
    const { error } = await supabaseClient
      .from('products')
      .update({
        ...product,
      })
      .eq('id', productId);

    if (error) {
      console.log(error);
      toast.error('Produit ajouté');
      return;
    }
    toast.success("Erreur lors de l'ajout du produit");
    router.push('/products');
  };

  const remove = async () => {
    const { error } = await supabaseClient
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.log(error);
      toast.error('Erreur lors de la suppression du produit');
      return;
    }
    toast.success('Produit supprimée');
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
      id,
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
      id,
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

    update(input);
  };

  const leftButtons = (
    <Button variant={'outlined'} onClick={handleModal}>
      {'Gérer les variantes'}
    </Button>
  );

  const rightButtons = (
    <Button
      variant={'outlined'}
      disabled={productId === null}
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
          router.push('/products');
        }}
      >
        {'Retour'}
      </Button>
      {product ? (
        <ProductForm
          formMode={'edit'}
          initialValues={product}
          onSubmit={onSubmit}
          leftButtons={leftButtons}
          rightButtons={rightButtons}
        />
      ) : (
        false
      )}
      <VariantsDialog
        open={modal}
        handleClose={handleModal}
        productId={productId}
      />
    </Box>
  );
};

export default DashboardEditProductView;
