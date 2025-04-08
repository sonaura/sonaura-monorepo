import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Field, FieldProps } from 'formik';
import { useEffect, useState } from 'react';

interface Props {
  name: string;
  label?: string;
}

const NumericField: React.FC<Props & TextFieldProps> = ({ name, label }) => {
  return (
    <Field name={name}>
      {(props: FieldProps) => <FormField {...props} label={label} />}
    </Field>
  );
};

const FormField: React.FunctionComponent<FieldProps & { label?: string }> = (
  props,
) => {
  const {
    field: { name, onBlur, value: formikValue },
    meta: { error, touched },
    form: { setFieldValue },
    label,
  } = props;

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(formikValue === null ? '' : formikValue);
  }, [formikValue]);

  return (
    <TextField
      name={name}
      label={label || name}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
      onBlur={onBlur}
      value={value}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      error={touched && Boolean(error)}
      helperText={touched && error ? '' : null}
      fullWidth
    />
  );
};

export default NumericField;
