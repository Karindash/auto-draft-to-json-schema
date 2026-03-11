import React from 'react';

interface CardProps {
  title?: string;
  icon?: React.ReactNode;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, icon, headerAction, children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {(title || icon || headerAction) && (
        <div className="card-header">
          <div className="card-title-group">
            {icon && <span className="card-icon">{icon}</span>}
            {title && <h2>{title}</h2>}
          </div>
          {headerAction && <div className="card-action">{headerAction}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};
