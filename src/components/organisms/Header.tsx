import React, { useState, useEffect } from 'react';
import '../../styles/elements/Header.css';
import { useSchemaStore } from '../../global/store/SchemaContext';
import { Button } from '../atoms/Button';
import { Title } from '../atoms/Title';

export const Header: React.FC = () => {
  const { actions } = useSchemaStore();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return [
      hrs > 0 ? String(hrs).padStart(2, '0') : null,
      String(mins).padStart(2, '0'),
      String(secs).padStart(2, '0')
    ].filter(Boolean).join(':');
  };
  
  return (
    <header className="header">
      <div className="header-left">
        <Title level={1}>
          <span style={{ fontSize: '1.6rem' }}>📐</span>
          DRAFTER 
          <span className="version-badge">v1.2 PRO</span>
        </Title>
        <div className="stopwatch">
          <span className="stopwatch-icon">⏱️</span>
          <span className="stopwatch-time">{formatTime(seconds)}</span>
        </div>
      </div>
      <div className="actions">
        <Button 
          variant="neutral" 
          className="primary-action" 
          onClick={actions.saveProject}
          style={{ marginRight: '0.5rem' }}
        >
          <span>💾</span> Save Project
        </Button>
        <Button 
          variant="neutral" 
          onClick={actions.resetProject}
          style={{ marginRight: '0.5rem' }}
        >
          <span>🔄</span> Reset
        </Button>
        <Button 
          variant="delete" 
          onClick={actions.deleteProject}
        >
          <span>🗑️</span> Delete
        </Button>
      </div>
    </header>
  );
};
