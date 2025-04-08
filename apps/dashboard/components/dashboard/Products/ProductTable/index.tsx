import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import LoadingScreen from 'components/system/LoadingScreen';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { Category, Product, Shop } from '@sonaura/database/types';
import { createClient } from '@sonaura/database/client';

const ProductTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const router = useRouter();

  const supabaseClient = createClient();

  const fetchProducts = async () => {
    const { data } = await supabaseClient.from('products').select('*');

    if (data) {
      setProducts(data as Product[]);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data } = await supabaseClient.from('categories').select('*');

    if (data) {
      setCategories(data);
    }
  };

  const fetchShops = async () => {
    const { data } = await supabaseClient.from('shops').select('*');

    if (data) {
      setShops(data);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchShops();
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', flex: 15 },
    { field: 'slug', headerName: 'Slug', flex: 15 },
    { field: 'fromPrice', headerName: 'Prix à partir de', flex: 15 },
    { field: 'price', headerName: 'Prix fixe', flex: 15 },
    {
      field: 'categoryId',
      headerName: 'Catégorie',
      flex: 15,
      renderCell: ({ value }) =>
        categories.find((category) => category.id === value)?.name,
    },
    {
      field: 'shopId',
      headerName: 'Magasin',
      flex: 15,
      renderCell: ({ value }) => shops.find((shop) => shop.id === value)?.city,
    },
  ];

  if (loading) return <LoadingScreen />;

  return (
    <DataGrid
      columns={columns}
      rows={products}
      onRowClick={({ id }) => {
        router.push(`/products/${id}`);
      }}
      autoHeight
      sx={{ cursor: 'pointer' }}
    />
  );
};

export default ProductTable;
