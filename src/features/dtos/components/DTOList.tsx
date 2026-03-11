import React from 'react';
import { useSchemaStore } from '../../../core/store/SchemaContext';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';

export const DTOList: React.FC = () => {
  const { schema, actions } = useSchemaStore();

  return (
    <section className="dtos-feature">
      <div className="section-header">
        <h2>DTO Templates</h2>
        <Button variant="secondary" size="sm" onClick={actions.syncDTOs}>🔄 Sync from Services</Button>
      </div>

      <div className="dto-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {(schema.dtos || []).map((dto, dIdx) => (
          <Card 
            key={dIdx} 
            title={dto.name}
            headerAction={<Button variant="danger" size="sm" onClick={() => actions.updateDTO(dIdx, { fields: [] })}>×</Button>}
          >
            <p style={{ fontSize: '0.75rem', margin: '0 0 1rem' }}>Base Entity: <strong>{dto.base_entity}</strong></p>
            <div style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '8px' }}>
              {(dto.fields || []).map((field, fIdx) => (
                <div key={fIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '0.25rem 0', borderBottom: '1px solid #e2e8f0' }}>
                  <span>{field.name}</span>
                  <span style={{ color: '#64748b' }}>{field.type}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
