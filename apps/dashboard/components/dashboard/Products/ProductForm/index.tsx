import { Field, FieldProps, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { productFrom } from './product.validator';
import NumericField from 'components/system/Form/NumericField';
import TextField from 'components/system/Form/TextField';
import SelectField from 'components/system/Form/SelectField';
import toast from 'react-hot-toast';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import type {
  Category,
  CreateProductInput,
  Shop,
  UpdateProductInput,
} from '@sonaura/database/types';
import { createClient } from '@sonaura/database/client';

export type InsertOrUpdateProduct = CreateProductInput | UpdateProductInput;

interface Props {
  formMode: 'create' | 'edit';
  initialValues: InsertOrUpdateProduct;
  onSubmit: (
    values: InsertOrUpdateProduct,
    actions?: FormikHelpers<InsertOrUpdateProduct>,
  ) => void;
  leftButtons?: React.ReactNode;
  rightButtons?: React.ReactNode;
}

const ProductForm: React.FC<Props> = ({
  formMode,
  initialValues,
  onSubmit,
  leftButtons = null,
  rightButtons = null,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);

  const supabaseClient = createClient();

  const getImageUrl = (value: string | object): string => {
    let image: {
      bucket: string;
      file: string;
    };
    try {
      image = typeof value === 'string' ? JSON.parse(value) : value;
    } catch (e) {
      return '';
    }
    const bucket = image['bucket'];
    const file = image['file'];
    const { data } = supabaseClient.storage.from(bucket).getPublicUrl(file);
    return data ? data.publicUrl : '';
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
    fetchCategories();
    fetchShops();
  }, []);

  const uploadImage = async (files: FileList | null): Promise<object> => {
    if (!files || files.length === 0) {
      toast.error('Aucun fichier sélectionné');
      return {};
    }

    const bucket = 'products';
    const fileName = crypto.randomUUID();
    const file = files[0];

    if (file) {
      const { error } = await supabaseClient.storage
        .from(bucket)
        .upload(fileName, file);

      if (error) {
        toast.error("Erreur lors de l'upload de l'image");
        return {};
      }
    }

    toast.success('Image ajoutée');
    return {
      bucket,
      file: fileName,
    };
  };

  return (
    <Formik<InsertOrUpdateProduct>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={productFrom}
    >
      {({ isValid, dirty, handleSubmit }) => (
        <React.Fragment>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack
                direction={'row'}
                marginBottom={2}
                spacing={1}
                display={'flex'}
                justifyContent={'space-between'}
              >
                <Box display={'flex'} gap={'1rem'}>
                  <Button
                    variant={'contained'}
                    disabled={!isValid || !dirty}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    {formMode === 'create' ? 'Ajouter' : 'Editer'}
                  </Button>
                  {leftButtons}
                </Box>
                {rightButtons}
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <TextField name={'name'} label={'Nom'} />
            </Grid>
            <Grid item xs={6}>
              <TextField name={'slug'} label={'Slug'} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name={'description'}
                label={'Description'}
                multiline
                minRows={2}
                maxRows={10}
              />
            </Grid>
            <Grid item xs={6}>
              <NumericField name={'price'} label={'Prix'} />
            </Grid>
            <Grid item xs={6}>
              <NumericField name={'fromPrice'} label={'Prix à partir de'} />
            </Grid>
            <Grid item xs={6}>
              <SelectField
                name={'categoryId'}
                data={(categories || []).map((category) => ({
                  id: category.id,
                  value: category.id,
                  label: category.name,
                }))}
                label={'Catégories'}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectField
                name={'shopId'}
                data={(shops || []).map((shop) => ({
                  id: shop.id,
                  value: shop.id,
                  label: shop.city || '',
                }))}
                label={'Ville'}
              />
            </Grid>
            <Grid item xs={6}>
              <NumericField name={'quantity'} label={'Quantité'} />
            </Grid>
            <Grid item xs={12}>
              <Field name={'mainImage'}>
                {({
                  field: { name, value },
                  form: { setFieldValue },
                }: FieldProps) => (
                  <>
                    {value ? (
                      <img
                        src={getImageUrl(value)}
                        alt={name}
                        style={{ maxWidth: '100%' }}
                      />
                    ) : null}
                    <Button variant="contained" component="label">
                      {value ? "Remplacer l'image" : 'Ajouter une image'}
                      <input
                        name={name}
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={async (e) => {
                          const image = await uploadImage(e.target.files);
                          setFieldValue(name, image);
                        }}
                      />
                    </Button>
                  </>
                )}
              </Field>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default ProductForm;
