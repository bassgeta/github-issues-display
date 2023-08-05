import { FC } from 'react';
import './loader.css';

interface LoaderProps {
  size?: number;
  color?: string;
}

export const Loader: FC<LoaderProps> = ({
  size = 32,
  color = '--text-primary',
}) => (
  <div
    className="loader"
    style={{
      '--loader-size': `${size}px`,
      '--loader-color': `var(${color})`,
    }}
  >
    <svg className="loader-svg" viewBox="22 22 44 44">
      <circle
        className="loader-circle"
        cx="44"
        cy="44"
        r="20.2"
        fill="none"
        strokeWidth={4}
      ></circle>
    </svg>
  </div>
);
