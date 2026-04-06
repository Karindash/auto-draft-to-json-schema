import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: (Option | string)[];
  error?: string;
  noWrapper?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({ 
  label, 
  options = [], 
  error, 
  children, 
  noWrapper = false,
  className = '', 
  ...props 
}) => {
  const select = (
    <select 
      className={`${error ? 'input-error' : ''} ${className}`} 
      {...props} 
    >
      {children || options.map((opt, i) => {
        if (typeof opt === 'string') {
          return <option key={i} value={opt}>{opt}</option>;
        }
        return <option key={i} value={opt.value}>{opt.label}</option>;
      })}
    </select>
  );

  if (noWrapper && !label && !error) {
    return select;
  }

  return (
    <div className={`form-group ${noWrapper ? '' : className}`}>
      {label && <label>{label}</label>}
      {select}
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};
