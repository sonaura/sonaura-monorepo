import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { Field, FieldProps } from 'formik';

interface Props {
  name: string;
}

const TextField: React.FC<Props & TextFieldProps> = ({
  name,
  label,
  ...props
}) => {
  return (
    <Field name={name}>
      {({
        field: { name, onBlur, onChange, value },
        meta: { error, touched },
      }: FieldProps) => (
        <MuiTextField
          name={name}
          label={label || name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          error={touched && Boolean(error)}
          helperText={touched && error ? '' : null}
          fullWidth
          {...props}
        />
      )}
    </Field>
  );
};

export default TextField;
