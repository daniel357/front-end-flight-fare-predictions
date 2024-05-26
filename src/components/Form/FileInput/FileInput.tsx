import { FileInputProps } from './FileInput.types';

const FileInput = (props: FileInputProps) => <input type="file" {...props} style={{ display: 'none' }} />;

export default FileInput;
