import React from 'react';
import { useSchemaStore } from '../../core/store/SchemaContext';

export const Header: React.FC = () => {
  const { schema } = useSchemaStore();
  
  const handleCopy = () => {
    const jsonString = JSON.stringify(schema, null, 2);
    navigator.clipboard.writeText(jsonString);
    alert("Copied to clipboard!");
  };

  return (
    <header className="header">
      <h1>
        <span style={{ fontSize: '1.2rem' }}>📐</span>
        Drafter 
        <span className="version-badge">v1.2 PRO</span>
      </h1>
      <div className="actions">
        <button className="btn-secondary" style={{ marginRight: '1rem' }} onClick={handleCopy}>
          <span>📋</span> Copy JSON
        </button>
        <button className="btn-primary" onClick={() => console.log(schema)}>
          <span>💾</span> Save Project
        </button>
      </div>
    </header>
  );
};
