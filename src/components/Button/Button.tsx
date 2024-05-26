import { Button } from '@mui/material';

import { ButtonProps, BUTTON_THEME } from './Button.types';
import styles from './Button.module.scss';

const StyledButton = ({
  children,
  type,
  size,
  margin,
  theme = BUTTON_THEME.Primary,
  className,
  variant = 'contained',
  disabled = false,
  fullWidth = true,
  onClick,
}: ButtonProps) => {
  return (
    <Button
      type={type}
      size={size}
      style={{ margin }}
      variant={variant}
      disabled={disabled}
      className={`${styles.button} ${styles[theme]} ${className}`}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
