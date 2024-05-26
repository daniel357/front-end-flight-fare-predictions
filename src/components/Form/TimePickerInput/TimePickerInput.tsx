import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import { InputAdornment, TextField } from '@mui/material';
import { useField } from 'formik';
import { useState } from 'react';

import { FormField } from '../Form.types';

import styles from '/styles/inputs.module.scss';

const TimePickerInput = ({ field }: { field: FormField }) => {
  const [fieldProps, meta, helpers] = useField(field.name);
  const [value, setValue] = useState<Date | null>(meta.initialValue);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={field.label}
        value={value}
        onChange={(newValue: Date) => {
          setValue(newValue);
          helpers.setValue(newValue?.toISOString(), true);
        }}
        renderInput={(params: object) => (
          <TextField
            fullWidth
            {...params}
            {...fieldProps}
            margin="dense"
            id={field.name}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            InputLabelProps={{ className: styles.label }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <KeyboardArrowDownIcon />
                </InputAdornment>
              ),
              className: styles.input,
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default TimePickerInput;
