import { useField } from 'formik';
import TextField from '@mui/material/TextField';

import { TextInputTypes } from './TextInput.types';

import styles from '/styles/inputs.module.scss';

const TextInput = ({ margin = 'dense', ...props }: TextInputTypes) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      margin={margin}
      id={props.name}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      InputLabelProps={{ className: styles.label }}
      InputProps={{
        className: styles.input,
      }}
    />
  );
};

export default TextInput;
