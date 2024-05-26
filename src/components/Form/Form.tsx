import { Form as FormikForm, Formik } from 'formik';
import { object as yupObject, Schema } from 'yup';
import { Typography } from '@mui/material';

import Button from '../Button/Button';

import TextInput from './TextInput/TextInput';
import DatePickerInput from './DatePickerInput/DatePickerInput';
import TimePickerInput from './TimePickerInput/TimePickerInput';
import CheckboxInput from './CheckboxInput/CheckboxInput';
import RadioInput from './RadioInput/RadioInput';
import TextareaInput from './TextareaInput/TextareaInput';
import { FormFieldType, FormProps } from './Form.types';
import styles from './Form.module.scss';

const Form = ({ groups, initialValues, buttonText, onSubmit, enableReinitialize }: FormProps) => {
  const validationSchema: { [name: string]: Schema } = {};

  const inputs = groups.map((group, groupIndex) => {
    return (
      <div key={groupIndex} className={group.areOnSameRow ? styles.groupRow : styles.group}>
        {group.header && (
          <Typography variant="h2" fontWeight="bold" sx={{ mb: '10px', fontSize: '20px' }}>
            {group.header}
          </Typography>
        )}
        {group.fields.map(field => {
          if (field.validation) validationSchema[field.name] = field.validation;

          switch (field.type) {
            case FormFieldType.Checklist:
              return <CheckboxInput key={field.name} field={field} />;
            case FormFieldType.Radio:
              return <RadioInput key={field.name} field={field} />;
            case FormFieldType.Date:
              return <DatePickerInput key={field.name} field={field} />;
            case FormFieldType.Time:
              return <TimePickerInput key={field.name} field={field} />;
            case FormFieldType.Textarea:
              return <TextareaInput key={field.name} field={field} />;
            case FormFieldType.Password:
              return <TextInput key={field.name} label={field.label || ''} name={field.name} type="password" />;
            case FormFieldType.Email:
              return <TextInput key={field.name} label={field.label || ''} name={field.name} type="email" />;
            case FormFieldType.Text:
            default:
              return <TextInput key={field.name} label={field.label || ''} name={field.name} />;
          }
        })}
      </div>
    );
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={enableReinitialize}
        validationSchema={yupObject(validationSchema)}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onSubmit(values);
        }}
      >
        {formik => (
          <FormikForm className={styles.form}>
            <div className={styles.inputsContainer}>{inputs}</div>
            <Button type="submit" margin="1.2em 0 0 0" disabled={!formik.isValid || formik.isSubmitting}>
              {buttonText}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default Form;
