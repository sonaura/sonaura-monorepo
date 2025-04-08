'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Delete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CategoryForm, {
  InsertOrUpdateCategory,
} from '@/components/dashboard/Categories/CategoryForm';
import type { Category, UpdateCategoryInput } from '@sonaura/database/types';
import { createClient } from '@sonaura/database/client';
import { useRouter } from 'next/navigation';

export type DashboardEditCategoryViewProps = {
  categoryId: string;
};

export const DashboardEditCategoryView = ({
  categoryId,
}: DashboardEditCategoryViewProps) => {
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);

  const supabaseClient = createClient();

  const fetchCategory = useCallback(async () => {
    const { data } = await supabaseClient
      .from('categories')
      .select('*')
      .eq('id', categoryId)
      .single();
    if (data) {
      setCategory(data);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const update = async (category: UpdateCategoryInput) => {
    const { error } = await supabaseClient
      .from('categories')
      .update({
        ...category,
      })
      .eq('id', categoryId);

    if (error) {
      console.log(error);
      toast.error('Erreur lors de la mise à jour de la catégorie');
      return;
    }
    toast.success('Catégories mise à jour');
    router.push('/categories');
  };

  const remove = async () => {
    const { error } = await supabaseClient
      .from('categories')
      .delete()
      .eq('id', categoryId);

    if (error) {
      console.log(error);
      toast.error('Erreur lors de la suppression de la categorie');
      return;
    }
    toast.success('Categorie supprimée');
    router.push('/categories');
  };

  const onSubmit = (values: InsertOrUpdateCategory) => {
    const { id, name, slug, icon } = values;

    const input = {
      id,
      name,
      slug,
      icon,
    };

    update(input);
  };

  const rightButtons = (
    <Button
      variant={'outlined'}
      disabled={categoryId === null}
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
          router.push('/categories');
        }}
      >
        {'Retour'}
      </Button>
      {category ? (
        <CategoryForm
          formMode={'edit'}
          initialValues={category}
          onSubmit={onSubmit}
          rightButtons={rightButtons}
        />
      ) : (
        false
      )}
    </Box>
  );
};
