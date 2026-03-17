import type { InputHTMLAttributes } from 'react';

interface AppInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id?: number | string;
  label: string;
}

export default function AppInput({ label, ...props }: AppInputProps) {
  return (
    <label className="field">
      <span>{label}</span>
      <input className="app-input" {...props} id={props.id?.toString() || ''} />
    </label>
  );
}
