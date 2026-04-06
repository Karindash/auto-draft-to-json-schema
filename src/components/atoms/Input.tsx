import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  noWrapper?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, error, noWrapper = false, className = '', ...props }) => {
  const input = (
    <input 
      className={`${error ? 'input-error' : ''} ${className}`} 
      {...props} 
    />
  );

  if (noWrapper && !label && !error) {
    return input;
  }

  return (
    <div className={`form-group ${noWrapper ? '' : className}`}>
      {label && <label>{label}</label>}
      {input}
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};
