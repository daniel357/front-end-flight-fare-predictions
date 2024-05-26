import { Schema } from 'yup';

export interface FormProps {
  groups: FormFieldGroup[];
  initialValues: FormData;
  buttonText: string;
  onSubmit: (data: FormData) => void;
  enableReinitialize?: boolean;
}

export interface FormData {
  [key: string]: FieldValueType;
}

export interface FormFieldGroup {
  header?: string;
  fields: FormField[];
  areOnSameRow?: boolean;
}

export interface FormField {
  type: FormFieldType;
  name: string;
  label?: string;
  validation?: Schema;
  options?: FormFieldOption[];
  enableIfField?: EnableIfFieldRule;
}

export interface EnableIfFieldRule {
  fieldName: string;
  value: any;
}

export interface FormFieldOption {
  label: string;
  identifier?: string;
  value?: string | number | boolean;
}

export const enum FormFieldType {
  Text = 1,
  Textarea = 2,
  Date = 3,
  Time = 4,
  Checklist = 5,
  Radio = 6,
  Location = 7,
  Password = 8,
  Email = 9,
}

export type FieldValueType = any;

export type SetFieldValue = (name: string, value: any, shouldValidate?: boolean) => void;
