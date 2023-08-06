import { ButtonHTMLAttributes, CSSProperties, FC } from 'react';
import './button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  return (
    <button
      {...props}
      style={
        {
          '--bg-color': `var(--button-bg-${variant})`,
          '--text-color': `var(--button-text-${variant})`,
        } as CSSProperties
      }
      className={`button-base ${props.className ?? undefined}`}
    />
  );
};
