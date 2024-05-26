import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useField } from 'formik';
import { useState } from 'react';

import { FormField } from '../Form.types';

const RadioInput = ({ field }: { field: FormField }) => {
  const [_, meta, helpers] = useField(field.name);
  const [value, setValue] = useState(meta.initialValue);

  return (
    <RadioGroup name={field.name} value={value}>
      {field.options?.map((option, index) => {
        return (
          <FormControlLabel
            key={index}
            value={option.value}
            control={<Radio />}
            label={<Typography variant={'body1'}>{option.label}</Typography>}
            onChange={() => {
              setValue(option.value);
              helpers.setValue(option.value);
            }}
          />
        );
      })}
    </RadioGroup>
  );
};

export default RadioInput;
