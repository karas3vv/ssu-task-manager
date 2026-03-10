import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  fullWidth?: boolean;
}

export default function AppButton({ children, fullWidth = false, ...props }: AppButtonProps) {
  return (
    <button className={`app-button ${fullWidth ? 'full-width' : ''}`} {...props}>
      {children}
    </button>
  );
}
