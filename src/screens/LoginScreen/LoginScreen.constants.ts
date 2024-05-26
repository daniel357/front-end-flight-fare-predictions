import { string } from 'yup';

import { FormData, FormFieldGroup, FormFieldType } from '../../components/Form/Form.types';

const enum LOGIN_FIELDS {
  Email = 'email',
  Password = 'password',
}

export const REGISTRATION_INITIAL_VALUES: FormData = {
  [LOGIN_FIELDS.Email]: '',
  [LOGIN_FIELDS.Password]: '',
};

export const LOGIN_FORM_GROUP: FormFieldGroup[] = [
  {
    fields: [
      {
        type: FormFieldType.Email,
        name: 'email',
        label: 'email',
        validation: string().required('email required'),
      },
      {
        type: FormFieldType.Password,
        name: 'password',
        label: 'password',
        validation: string().required('password required'),
      },
    ],
  },
];
