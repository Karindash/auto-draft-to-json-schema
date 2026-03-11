import React, { useState } from 'react';
import { useSchemaStore } from '../../../core/store/SchemaContext';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';

export const EntityList: React.FC = () => {
  const { schema, actions } = useSchemaStore();
  const [expandedEntities, setExpandedEntities] = useState<Record<number, boolean>>({});

  const toggleExpand = (idx: number) => {
    setExpandedEntities(prev => ({
      ...prev,
      [idx]: prev[idx] === false ? true : false
    }));
  };

  return (
    <section className="entities-feature">
      <div className="section-header">
        <h2>Entities</h2>
        <Button variant="add" onClick={actions.addEntity}>+ New Entity</Button>
      </div>

      {(schema.entities || []).map((entity, eIdx) => {
        const isExpanded = expandedEntities[eIdx] !== false;
        
        return (
          <Card 
            key={eIdx}
            className="entity-card"
            headerAction={<Button variant="danger" size="sm" onClick={() => actions.removeEntity(eIdx)}>×</Button>}
            title={entity.name || "Unnamed Entity"}
            icon={
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => toggleExpand(eIdx)}
                style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}
              >
                ▼
              </Button>
            }
          >
            {isExpanded && (
              <div className="entity-details">
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label>Description</label>
                  <input 
                    type="text" 
                    value={entity.description} 
                    onChange={e => actions.updateEntity(eIdx, { description: e.target.value })} 
                  />
                </div>

                <div className="sub-section">
                  <div className="section-header">
                    <h4>Attributes</h4>
                    <Button variant="ghost" size="sm" onClick={() => actions.addAttribute(eIdx)}>+ Field</Button>
                  </div>
                  {/* ... Attributes Logic (Truncated for brevity, normally goes here) ... */}
                  {(entity.attributes || []).map((attr, aIdx) => (
                    <div key={aIdx} className="attribute-container">
                      <div className="attribute-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px 40px', gap: '1rem' }}>
                        <input value={attr.field_name} onChange={e => actions.updateAttribute(eIdx, aIdx, { field_name: e.target.value })} placeholder="Field Name" />
                        <select value={attr.data_type} onChange={e => actions.updateAttribute(eIdx, aIdx, { data_type: e.target.value })}>
                           <option value="String (VARCHAR)">String</option>
                           <option value="Integer (INT)">Integer</option>
                           <option value="UUID">UUID</option>
                        </select>
                        <label className="checkbox-label" style={{ fontSize: '0.7rem' }}>
                          <input type="checkbox" checked={attr.constraints.required} onChange={e => actions.updateAttribute(eIdx, aIdx, { constraints: { ...attr.constraints, required: e.target.checked } })} /> REQ
                        </label>
                        <Button variant="danger" size="sm" onClick={() => actions.removeAttribute(eIdx, aIdx)}>×</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </section>
  );
};
