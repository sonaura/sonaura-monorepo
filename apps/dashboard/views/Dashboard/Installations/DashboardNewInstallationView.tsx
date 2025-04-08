'use client';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { initialValues } from '@/components/dashboard/Categories/CategoryForm/category.validator';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import InstallationForm, {
  InsertOrUpdateInstallation,
} from '@/components/dashboard/Installations/InstallationForm';
import { CreateInstallationInput } from '@sonaura/database/types';
import { createClient } from '@sonaura/database/client';

export const DashboardNewInstallationView = () => {
  const router = useRouter();
  const supabaseClient = createClient();

  const create = async (installation: CreateInstallationInput) => {
    const { error } = await supabaseClient
      .from('installations')
      .insert([installation]);

    if (error) {
      console.log(error);
      toast.error("Erreur lors de l'ajout de la réalisation");
      return;
    }
    toast.success('Réalisation ajoutée');
    router.push('/installations');
  };

  const onSubmit = (values: InsertOrUpdateInstallation) => {
    const { title, description, images } = values;

    const input = {
      title,
      description,
      images,
    };

    create(input);
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => {
          router.push('/installations');
        }}
      >
        {'Retour'}
      </Button>
      <Typography sx={{ marginY: '1rem' }} variant="h1">
        {'Nouvelle réalisation'}
      </Typography>
      <InstallationForm
        formMode={'create'}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Box>
  );
};
