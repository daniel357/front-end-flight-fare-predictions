import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useField } from 'formik';

import styles from '/styles/inputs.module.scss';

import { FormField } from '../Form.types';

const DatePickerInput = ({ field }: { field: FormField }) => {
  const [fieldProps, meta, helpers] = useField(field.name);
  const [value, setValue] = useState<Date | null>(meta.initialValue);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
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

export default DatePickerInput;
