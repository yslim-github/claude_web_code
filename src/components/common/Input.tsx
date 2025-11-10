import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({
  className = '',
  error,
  ...props
}: InputProps) {
  return (
    <div className="input-wrapper">
      <input
        className={`input ${error ? 'input-error' : ''} ${className}`.trim()}
        {...props}
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}
