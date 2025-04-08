import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import LoadingScreen from 'components/system/LoadingScreen';
import type { Category } from '@sonaura/database/types';
import { createClient } from '@sonaura/database/client';

const CategoryTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  const fetchCategories = async () => {
    const supabaseClient = createClient();
    const { data } = await supabaseClient.from('categories').select('*');

    if (data) {
      setCategories(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', flex: 50 },
    { field: 'slug', headerName: 'Slug', flex: 50 },
  ];

  if (loading) return <LoadingScreen />;

  return (
    <DataGrid
      columns={columns}
      rows={categories}
      onRowClick={({ id }) => {
        router.push(`/categories/${id}`);
      }}
      autoHeight
      sx={{ cursor: 'pointer' }}
    />
  );
};

export default CategoryTable;
