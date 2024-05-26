import { MouseEventHandler, ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode | string | undefined;
  disabled?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  type?: 'button' | 'submit';
  size?: 'small' | 'large' | 'medium';
  fullWidth?: boolean;
  margin?: string;
  theme?: BUTTON_THEME;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

export const enum BUTTON_THEME {
  Primary = 'primary',
  Secondary = 'secondary',
  Text = 'text',
}
