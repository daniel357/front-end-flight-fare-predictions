import { useField } from 'formik';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useState } from 'react';

import { FormField, FormFieldOption } from '../Form.types';

import styles from './CheckboxInput.module.scss';

const CheckboxInput = ({ field }: { field: FormField }) => {
  const [fieldProps, meta, helpers] = useField(field.name);
  const [value, setValue] = useState(meta.initialValue);

  const isChecked: boolean[] = Object.values(value);

  return (
    <div role="group">
      {field.options?.map((option: FormFieldOption, optionIndex: number) => {
        return (
          <FormControlLabel
            key={optionIndex}
            className={styles.label}
            control={
              <Checkbox
                name={fieldProps.name}
                checked={isChecked[optionIndex]}
                onChange={e => {
                  const newValue = { ...value };
                  newValue[option.identifier!] = e.target.checked;

                  setValue(newValue);
                  helpers.setValue(newValue);
                }}
              />
            }
            label={<Typography variant={'body1'}>{option.label}</Typography>}
          />
        );
      })}
    </div>
  );
};

export default CheckboxInput;
