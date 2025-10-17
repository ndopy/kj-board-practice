import type { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {
  label: string;
}

export default function Input({ label, id, ...rest }: InputProps) {
  return (
    <div className="flex items-center gap-4">
      <label htmlFor={id} className="basis-24 shrink-0">
        {label}
      </label>
      <input
        id={id}
        className="flex-1 rounded-md border border-gray-200 bg-gray-50 p-2"
        {...rest}
      />
    </div>
  );
}
