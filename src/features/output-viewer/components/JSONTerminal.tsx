import React, { useMemo } from 'react';
import { useSchemaStore } from '../../../core/store/SchemaContext';

export const JSONTerminal: React.FC = () => {
  const { schema } = useSchemaStore();
  
  const jsonString = useMemo(() => {
    return JSON.stringify(schema, null, 2);
  }, [schema]);

  return (
    <aside className="preview">
      <div className="preview-sticky">
        <div className="preview-header">
          <h3>JSON Live Output</h3>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
        </div>
        <div className="preview-content">
          <pre>{jsonString}</pre>
        </div>
      </div>
    </aside>
  );
};
