import React from 'react';
import '../../styles/elements/Button.css';

export type ButtonVariant = 'add' | 'delete' | 'neutral' | 'icon';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Updated button variants per READ.md:
 * - add: Used for adding new items
 * - delete: Used for removing items
 * - neutral: Customizable by color, icon, or text
 */

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'neutral', 
  size = 'md', 
  icon, 
  children, 
  className = '', 
  fullWidth = false,
  ...props 
}) => {
  const isIconOnly = !children && icon;
  
  const baseClass = [
    'btn',
    `btn-${variant}`,
    `size-${size}`,
    isIconOnly ? 'btn-icon-only' : '',
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={baseClass} {...props}>
      {icon && <span className="btn-icon-wrapper">{icon}</span>}
      {children && <span className="btn-text">{children}</span>}
    </button>
  );
};
