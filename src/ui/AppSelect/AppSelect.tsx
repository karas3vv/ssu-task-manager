import type { SelectHTMLAttributes } from 'react';

interface Option {
  label: string;
  value: string;
}

interface AppSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
}

export default function AppSelect({ label, options, ...props }: AppSelectProps) {
  return (
    <label className="field">
      <span>{label}</span>
      <select className="app-input" {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
