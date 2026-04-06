import React from 'react';
import '../../styles/elements/Header.css';
import { useSchemaStore } from '../../global/store/SchemaContext';
import { Button } from '../atoms/Button';
import { Title } from '../atoms/Title';

export const Header: React.FC = () => {
  const { schema } = useSchemaStore();
  
  const handleCopy = () => {
    const jsonString = JSON.stringify(schema, null, 2);
    navigator.clipboard.writeText(jsonString);
    alert("Copied to clipboard!");
  };

  return (
    <header className="header">
      <Title level={1}>
        <span style={{ fontSize: '1.6rem' }}>📐</span>
        DRAFTER 
        <span className="version-badge">v1.2 PRO</span>
      </Title>
      <div className="actions">
        <Button variant="neutral" onClick={handleCopy} style={{ marginRight: '1rem' }}>
          <span>📋</span> Copy JSON
        </Button>
        <Button variant="neutral" className="primary-action" onClick={() => console.log(schema)}>
          <span>💾</span> Save Project
        </Button>
      </div>
    </header>
  );
};
