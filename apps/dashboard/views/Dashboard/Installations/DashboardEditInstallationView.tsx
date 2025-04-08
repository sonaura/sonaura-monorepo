'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Delete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InstallationForm, {
  InsertOrUpdateInstallation,
} from '@/components/dashboard/Installations/InstallationForm';
import { createClient } from '@sonaura/database/client';
import { Installation, UpdateInstallationInput } from '@sonaura/database/types';

export type DashboardEditInstallationViewProps = {
  installationId: string;
};

export const DashboardEditInstallationView = ({
  installationId,
}: DashboardEditInstallationViewProps) => {
  const router = useRouter();
  const supabaseClient = createClient();

  const [installation, setInstallation] = useState<Installation | null>(null);

  const fetchInstallation = useCallback(async () => {
    const { data } = await supabaseClient
      .from('installations')
      .select('*')
      .eq('id', installationId)
      .single();
    if (data) {
      setInstallation(data);
    }
  }, [installationId]);

  useEffect(() => {
    fetchInstallation();
  }, [fetchInstallation]);

  const update = async (installation: UpdateInstallationInput) => {
    const { error } = await supabaseClient
      .from('installations')
      .update({
        ...installation,
      })
      .eq('id', installationId);

    if (error) {
      console.log(error);
      toast.error('Réalisation ajoutée');
      return;
    }
    toast.success("Erreur lors de l'ajout de la réalisation");
    router.push('/installations');
  };

  const remove = async () => {
    const { error } = await supabaseClient
      .from('installations')
      .delete()
      .eq('id', installationId);

    if (error) {
      console.log(error);
      toast.error('Réalisation supprimée');
      return;
    }
    toast.success('Erreur lors de la suppression de la réalisation');
    router.push('/installations');
  };

  const onSubmit = (values: InsertOrUpdateInstallation) => {
    const { id, title, description, images } = values;

    const input = {
      id,
      title,
      description,
      images,
    };

    update(input);
  };

  const rightButtons = (
    <Button
      variant={'outlined'}
      disabled={installationId === null}
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
          router.push('/installations');
        }}
      >
        {'Retour'}
      </Button>
      {installation ? (
        <InstallationForm
          formMode={'edit'}
          initialValues={installation}
          onSubmit={onSubmit}
          rightButtons={rightButtons}
        />
      ) : (
        false
      )}
    </Box>
  );
};
