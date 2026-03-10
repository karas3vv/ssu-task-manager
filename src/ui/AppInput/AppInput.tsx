import type { InputHTMLAttributes } from 'react';

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function AppInput({ label, ...props }: AppInputProps) {
  return (
    <label className="field">
      <span>{label}</span>
      <input className="app-input" {...props} />
    </label>
  );
}
