import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import LoadingScreen from 'components/system/LoadingScreen';
import { createClient } from '@sonaura/database/client';
import { Installation } from '@sonaura/database/types';

const InstallationTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [installations, setInstallations] = useState<Installation[]>([]);
  const router = useRouter();

  const supabaseClient = createClient();

  const fetchInstallations = async () => {
    const { data } = await supabaseClient.from('installations').select('*');
    if (data) {
      setInstallations(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInstallations();
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'created_at',
      headerName: 'Date',
      renderCell: ({ value }) =>
        new Intl.DateTimeFormat('fr-FR', {
          dateStyle: 'short',
        }).format(new Date(value)),
      flex: 10,
    },
    { field: 'title', headerName: 'Titre', flex: 50 },
    { field: 'description', headerName: 'Description', flex: 50 },
  ];

  if (loading) return <LoadingScreen />;

  return (
    <DataGrid
      columns={columns}
      rows={installations}
      onRowClick={({ id }) => {
        router.push(`/installations/${id}`);
      }}
      autoHeight
      sx={{ cursor: 'pointer' }}
    />
  );
};

export default InstallationTable;
