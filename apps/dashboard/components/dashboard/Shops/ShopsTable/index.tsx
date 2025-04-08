import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import { useRouter } from 'next/router';
import LoadingScreen from 'components/system/LoadingScreen';
import { Shop } from '@sonaura/database/types';
import { createClient } from '@sonaura/database/client';

const ShopsTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [shops, setShops] = useState<Shop[]>([]);
  const router = useRouter();

  const supabaseClient = createClient();

  const fetchShops = async () => {
    const { data } = await supabaseClient.from('shops').select('*');
    if (data) {
      setShops(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  if (loading) return <LoadingScreen />;

  const columns: GridColDef[] = [
    { field: 'city', headerName: 'Ville', flex: 10 },
    { field: 'address', headerName: 'Adresse', flex: 10 },
    { field: 'postalCode', headerName: 'Code postal', flex: 10 },
    { field: 'country', headerName: 'Pays', flex: 10 },
    { field: 'phoneNumber', headerName: 'Téléphone', flex: 10 },
    { field: 'email', headerName: 'Email', flex: 10 },
    { field: 'googleMapsUrl', headerName: 'URL Google Maps', flex: 10 },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={shops}
      onRowClick={({ id }) => {
        router.push(`/shops/${id}`);
      }}
      autoHeight
      sx={{ cursor: 'pointer' }}
    />
  );
};

export default ShopsTable;
