import React from 'react';
import { useSchemaStore } from '../../../core/store/SchemaContext';

export const EndpointTable: React.FC = () => {
  const { schema } = useSchemaStore();

  return (
    <div className="endpoint-feature" style={{ marginTop: '2rem' }}>
      <div className="section-header"><h2>Endpoints (REST)</h2></div>
      <div className="endpoint-viewer">
        <div className="endpoint-header">
          <span>Method</span>
          <span>Path</span>
          <span>Function</span>
          <span>Target DTO</span>
        </div>
        <div className="endpoint-body">
          {(schema.services || []).flatMap(s => (s.operations || []).map(op => ({ ...op, service: s }))).map((op, idx) => {
            let targetDto = "";
            const entityName = op.service.target_entity;
            switch(op.type) {
              case 'create': targetDto = `Create${entityName}Request`; break;
              case 'updateBy': targetDto = `Update${entityName}Request`; break;
              case 'viewAll': case 'viewBy': targetDto = `${entityName}Response`; break;
              case 'custom': targetDto = `${op.name.charAt(0).toUpperCase() + op.name.slice(1)}DTO`; break;
            }
            return (
              <div key={idx} className="endpoint-row">
                <span className={`method-tag ${(op.http_method || 'get').toLowerCase()}`}>{op.http_method}</span>
                <span className="path-text" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 600 }}>{op.path}</span>
                <span className="func-text" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>{op.name}</span>
                <span className="dto-text" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{targetDto || "-"}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
