import { Typography } from '@mui/material';

import styles from './RadioButtonInput.module.scss';
import { RadioButtonInputProps } from './RadioButtonInput.types';

const RadioButtonInput = ({ active, title, onSelect }: RadioButtonInputProps) => {
  return (
    <div className={styles.container} onClick={onSelect}>
      <Typography
        color={active ? '#512AD8' : '#8E8D8D'}
        sx={{ ml: '20px', fontSize: 17 }}
        fontWeight="500"
        variant="h6"
        component="h2"
      >
        {title}
      </Typography>
      <input className={styles.container__radio} checked={active} name="radio" type="radio" onChange={onSelect} />
    </div>
  );
};

export default RadioButtonInput;
