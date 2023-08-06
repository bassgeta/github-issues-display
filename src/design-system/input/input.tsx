import { FC, InputHTMLAttributes } from 'react';
import './input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className={`input-base ${props.className ?? undefined}`}
    />
  );
};
