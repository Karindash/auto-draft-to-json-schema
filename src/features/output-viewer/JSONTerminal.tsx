import React from 'react';
import '../../styles/elements/JSONTerminal.css';
import { useSchemaStore } from '../../global/store/SchemaContext';
import { Title } from '../../components/atoms/Title';

export const JSONTerminal: React.FC = () => {
  const { schema } = useSchemaStore();

  return (
    <aside className="preview-sticky">
      <div className="preview-header">
        <Title level={3}>Live Schema JSON</Title>
        <div className="terminal-actions">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
      </div>
      <div className="preview-content">
        <pre>
          {JSON.stringify(schema, null, 2)}
        </pre>
      </div>
    </aside>
  );
};
