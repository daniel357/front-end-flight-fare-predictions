export interface FileInputProps {
  id: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  capture?: 'environment' | 'user';
}
