import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import VariantsTable from 'components/dashboard/Products/Variants/VariantsTable';
import { MouseEvent } from 'react';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Variant } from 'types';
import { createClient } from '@sonaura/database/client';

interface Props {
  open: boolean;
  handleClose: () => void;
  productId: string;
}

export const variantsName: Record<string, string> = {
  color: 'Couleur',
  size: 'Taille',
  frameColor: 'Couleur du cadre',
  positioning: 'Positionnement',
  soundbarColor: 'Couleur de la barre de son',
  supportColor: 'Couleur du support',
};

const VariantsDialog: React.FC<Props> = ({ open, handleClose, productId }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [variants, setVariants] = useState<Variant[]>([]);

  const handleMenu = (event?: unknown) => {
    setAnchorEl(
      !openMenu ? ((event as MouseEvent)?.currentTarget as HTMLElement) : null,
    );
    setOpenMenu((prev) => !prev);
  };

  const supabaseClient = createClient();

  const fetchProduct = useCallback(async () => {
    const { data } = await supabaseClient
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();
    if (data) {
      setVariants(
        data.variants === null ? [] : Array.from(data.variants as Variant[]),
      );
    } else {
      setVariants([]);
    }
  }, [productId]);

  useEffect(() => {
    if (open) {
      fetchProduct();
    }
  }, [productId, open, fetchProduct]);

  const saveVariants = async () => {
    const { error } = await supabaseClient
      .from('products')
      .update({
        variants,
      })
      .eq('id', productId);

    if (error) {
      toast.error('Erreur lors de la mise à jour des variantes');
      return;
    }
    toast.success('Variantes mises à jour');
  };

  const addAttribute = (attr: string) => {
    const newAttribute: Variant = {
      id: crypto.randomUUID(),
      name: attr,
      values: [],
    };
    setVariants((prev) => [...prev, newAttribute]);
  };

  const deleteAttribute = (attr: string) => {
    setVariants((prev) => prev.filter((a) => a.name !== attr));
  };

  const addOption = (attrName: string, value: string) => {
    setVariants((prev) => {
      const attr = prev.find((a) => a.name === attrName);

      const values = (attr?.values || []).filter((val) => val !== value);
      values.push(value);

      return [
        ...prev.filter((a) => a.name !== attrName),
        {
          name: attrName,
          id: attr?.id || '',
          values,
        },
      ];
    });
  };

  const deleteOption = (attrName: string, value: string) => {
    setVariants((prev) => {
      const attr = prev.find((a) => a.name === attrName);

      const values = (attr?.values || []).filter((val) => val !== value);

      return [
        ...prev.filter((a) => a.name !== attrName),
        {
          name: attrName,
          id: attr?.id || '',
          values,
        },
      ];
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <Box padding={'1rem'} display={'flex'} justifyContent={'space-between'}>
        <Stack direction={'row'} gap={'1rem'}>
          <Button variant={'contained'} onClick={saveVariants}>
            {'Enregistrer'}
          </Button>
          <Button endIcon={<Add />} variant={'outlined'} onClick={handleMenu}>
            {'Ajouter une variante'}
          </Button>
          <Menu
            open={openMenu}
            anchorEl={anchorEl}
            onClose={(e) => handleMenu(e)}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {Object.entries(variantsName).map(([key, attribute]) => (
              <MenuItem
                key={key}
                onClick={() => {
                  addAttribute(key);
                  handleMenu();
                }}
                disabled={
                  variants &&
                  Boolean(variants.find((attr) => attr.name === key))
                }
              >
                {attribute}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
        <Button variant={'outlined'} onClick={handleClose}>
          {'Fermer'}
        </Button>
      </Box>
      <Box padding={'1rem'}>
        {variants.length > 0 ? (
          <Box marginTop={'2rem'}>
            <Typography variant="h3">{'Variants'}</Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={'2rem'}
              flexWrap={'wrap'}
            >
              {variants.map((attribute) => (
                <AttributeCard
                  key={attribute.name}
                  attribute={attribute}
                  addOption={addOption}
                  deleteOption={deleteOption}
                  deleteAttribute={deleteAttribute}
                />
              ))}
            </Stack>
          </Box>
        ) : (
          <Typography variant="h4">{'Aucune variantes'}</Typography>
        )}
      </Box>
      <VariantsTable productId={productId} variants={variants} />
    </Dialog>
  );
};

interface CardProps {
  attribute: Variant;
  addOption: (attrName: string, value: string) => void;
  deleteOption: (attrName: string, value: string) => void;
  deleteAttribute: (attrName: string) => void;
}

const AttributeCard: React.FC<CardProps> = ({
  attribute,
  addOption,
  deleteOption,
  deleteAttribute,
}) => {
  const [value, setValue] = useState<string>('');

  const handleAddOption = () => {
    if (value.trim().length === 0) return;
    addOption(attribute.name, value);
    setValue('');
  };

  return (
    <Card
      key={attribute.name}
      sx={{
        marginTop: '1.5rem',
        width: {
          xs: '100%',
          md: '30%',
        },
      }}
    >
      <CardContent>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          marginBottom={'1rem'}
        >
          <Typography variant="h4">{`${variantsName[attribute.name]}`}</Typography>
          <Button
            onClick={() => {
              deleteAttribute(attribute.name);
            }}
            endIcon={<Delete />}
          >
            {'Supprimer'}
          </Button>
        </Stack>
        <Typography variant="h5">{'Options'}</Typography>
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={'0.5rem'}
          marginBottom={'1rem'}
          flexWrap={'wrap'}
        >
          {attribute.values.map((value) => (
            <Chip
              key={value}
              label={value}
              onDelete={() => {
                deleteOption(attribute.name, value);
              }}
            />
          ))}
        </Stack>
        <Stack>
          <TextField
            label={'Ajouter une option'}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddOption();
              }
            }}
            size="small"
          />
          <Button onClick={handleAddOption} endIcon={<Add />}>
            {'Ajouter'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default VariantsDialog;
