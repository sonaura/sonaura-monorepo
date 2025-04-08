import ArrowBack from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { initialValues } from 'components/dashboard/Categories/CategoryForm/category.validator';
import CategoryForm, {
  InsertOrUpdateCategory,
} from 'components/dashboard/Categories/CategoryForm';

import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { createClient } from '@sonaura/database/client';
import { CreateCategoryInput } from '@sonaura/database/types';

const DashboardNewCategoryView: React.FC = () => {
  const router = useRouter();

  const supabaseClient = createClient();

  const create = async (category: CreateCategoryInput) => {
    const { error } = await supabaseClient
      .from('categories')
      .insert([category]);

    if (error) {
      console.log(error);
      toast.error('Erreur lors de la création de la catégorie');
      return;
    }
    toast.success('Catégorie ajoutée');
    router.push('/categories');
  };

  const onSubmit = (values: InsertOrUpdateCategory) => {
    const { name, slug, icon } = values;

    const input = {
      name,
      slug,
      icon,
    };

    create(input as CreateCategoryInput);
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => {
          router.push('/categories');
        }}
      >
        {'Retour'}
      </Button>
      <Typography sx={{ marginY: '1rem' }} variant="h1">
        {'Nouvelle catégorie'}
      </Typography>
      <CategoryForm
        formMode={'create'}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Box>
  );
};

export default DashboardNewCategoryView;
