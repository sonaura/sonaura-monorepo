import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Field, FieldProps } from 'formik';
import { Key } from 'react';

type BaseType = {
  id: Key;
  label: string;
  value: string;
};

export type SelectFieldProps = {
  name: string;
  label: string;
  data: Array<BaseType>;
};

export const SelectField = ({ label, data, name }: SelectFieldProps) => {
  return (
    <Field name={name}>
      {({
        field: { name, onBlur, onChange, value },
        meta: { error, touched },
      }: FieldProps) => (
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            fullWidth
            name={name}
            label={label}
            value={value || ''}
            onBlur={onBlur}
            onChange={onChange}
            error={touched && Boolean(error)}
          >
            {(data || []).map((data: BaseType) => (
              <MenuItem key={data.id} value={data.value}>
                {data.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Field>
  );
};

export default SelectField;
