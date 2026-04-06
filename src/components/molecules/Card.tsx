import React from 'react';
import '../../styles/elements/Card.css';

import { Title } from '../atoms/Title';

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
            {title && <Title level={2}>{title}</Title>}
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
