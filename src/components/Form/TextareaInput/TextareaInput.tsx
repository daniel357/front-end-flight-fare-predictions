import { TextField } from '@mui/material';
import { useField } from 'formik';

import { TextareaInputProps } from './TextareaInput.types';

import styles from '/styles/inputs.module.scss';

const TextareaInput = ({ field }: TextareaInputProps) => {
  const [fieldProps, meta, helpers] = useField(field.name);
  let disabled = false;

  if (field.enableIfField) {
    const [relatedField] = useField({
      name: field.enableIfField.fieldName,
    });

    disabled = relatedField.value !== field.enableIfField.value;

    if (disabled && fieldProps.value) setTimeout(() => helpers.setValue(''));
  }

  return (
    <TextField
      fullWidth
      {...fieldProps}
      label={field.label}
      id={field.name}
      disabled={disabled}
      multiline
      rows={5}
      margin="dense"
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      InputLabelProps={{ className: styles.label }}
      InputProps={{ className: styles.inputTextArea }}
    />
  );
};

export default TextareaInput;
