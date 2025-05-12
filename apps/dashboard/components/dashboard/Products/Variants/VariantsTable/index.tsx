import Delete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AttributeDropdown from 'components/dashboard/Products/Variants/VariantsTable/AttributeDropdown';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { VariantImage, Variant } from 'types';
import { variantsName } from '../VariantsDialog';
import { createClient } from '@sonaura/database/client';

interface Props {
  productId: string;
  variants: Variant[];
}

const VariantsTable: React.FC<Props> = ({ productId, variants }) => {
  const [images, setImages] = useState<VariantImage[]>([]);

  const supabaseClient = createClient();

  const fetchProduct = useCallback(async () => {
    const { data } = await supabaseClient
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (data?.variantsImages) {
      setImages(data.variantsImages as VariantImage[]);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleImageUpload = async (files: FileList | null) => {
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

      const image: VariantImage = {
        image: {
          bucket,
          file: fileName,
        },
      };

      setImages((prev) => [...prev, image]);
    }
  };

  const handleImageVariant = async (
    image: VariantImage,
    option: { name: string; value: string },
  ) => {
    let variant = images.find(
      ({ image: im }) =>
        im.bucket === image.image.bucket && im.file === image.image.file,
    );
    if (variant === undefined) return;
    variant = {
      image: variant.image,
      variants: variant.variants
        ? [...variant.variants.filter((v) => v.name !== option.name), option]
        : [option],
    };
    setImages((prev) => [
      ...prev.filter((img) => img.image.file !== variant.image.file),
      variant,
    ]);
  };

  const handleDeleteImageVariant = (id: string) => {
    setImages((prev) => prev.filter((image) => image.image.file !== id));
  };

  const handlePriceUpdate = (id: string, price: string) => {
    setImages((prev) => {
      const imagesTemp = [...prev];
      const imageIndex = imagesTemp.findIndex((im) => im.image.file === id);
      if (imagesTemp[imageIndex]) {
        imagesTemp[imageIndex].price = price;
      }

      return imagesTemp;
    });
  };

  const handleSave = async () => {
    const { error } = await supabaseClient
      .from('products')
      .update({ variantsImages: images })
      .eq('id', productId);

    if (error) {
      toast.error('Erreur lors de la mise à jour des variantes.');
      return;
    }
    toast.success('Variantes mises à jour');
  };

  const variantsColumns: GridColDef[] = variants.map((variant) => ({
    field: variant.name,
    headerName: `${variantsName[variant.name]}`,
    renderCell: ({ id }) => {
      const image = images.find(
        (im) => im.image.bucket === 'products' && im.image.file === id,
      );
      return (
        <AttributeDropdown
          variant={variant}
          image={image}
          handleChange={handleImageVariant}
        />
      );
    },
    flex: 20,
  }));

  const columns: GridColDef[] = [
    {
      field: 'delete',
      headerName: 'Supprimer',
      renderCell: ({ id }) => (
        <Button
          onClick={() => {
            handleDeleteImageVariant(id as string);
          }}
        >
          <Delete />
        </Button>
      ),
    },
    {
      field: 'image',
      headerName: 'Image',
      renderCell: ({ value }) => {
        if (!value) return '';
        const bucket = value['bucket'];
        const file = value['file'];
        const { data } = supabaseClient.storage.from(bucket).getPublicUrl(file);
        return (
          <img
            src={data.publicUrl}
            alt={file}
            width={50}
            height={50}
            style={{ objectFit: 'cover' }}
          />
        );
      },
    },
    {
      field: 'price',
      headerName: 'Prix',
      renderCell: ({ row, id }) => (
        <TextField
          value={row.price || ''}
          onChange={(e) => {
            const price = e.target.value.replace(',', '.');
            handlePriceUpdate(id.toString(), price);
          }}
        />
      ),
    },
    ...variantsColumns,
  ];

  return (
    <Box padding={'1rem'} height={'100%'}>
      <Typography variant="h3">{'Gestions des images'}</Typography>
      <Stack direction={'row'} gap={'1rem'} sx={{ marginY: '2rem' }}>
        <Button variant="contained" component="label">
          {'Ajouter une image'}
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => {
              handleImageUpload(e.target.files);
            }}
          />
        </Button>
        <Button variant="contained" onClick={handleSave}>
          {'Enregistrer'}
        </Button>
      </Stack>

      {images.length > 0 ? (
        <DataGrid
          columns={columns}
          rows={images}
          density="comfortable"
          isRowSelectable={() => false}
          getRowId={(row) => row.image['file']}
        />
      ) : (
        <Typography>{'Image par variants'}</Typography>
      )}
    </Box>
  );
};

export default VariantsTable;
