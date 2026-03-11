import React from 'react';
import { useSchemaStore } from '../../../core/store/SchemaContext';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';

export const ServiceList: React.FC = () => {
  const { schema, actions } = useSchemaStore();

  return (
    <section className="services-feature" style={{ marginTop: '2rem' }}>
      <div className="section-header">
        <h2>Services</h2>
        <Button variant="add" onClick={actions.addService}>+ New Service</Button>
      </div>

      {(schema.services || []).map((service, sIdx) => (
        <Card 
          key={sIdx}
          title={service.name}
          className="service-card"
          headerAction={<Button variant="danger" size="sm" onClick={() => actions.removeService(sIdx)}>×</Button>}
        >
          <div className="form-grid">
            <div className="form-group">
              <label>Associated Entity</label>
              <select value={service.target_entity} onChange={e => actions.updateService(sIdx, { target_entity: e.target.value })}>
                <option value="">Select Entity...</option>
                {(schema.entities || []).map((e, i) => <option key={i} value={e.name}>{e.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <input 
                type="text" 
                value={service.description} 
                onChange={e => actions.updateService(sIdx, { description: e.target.value })} 
                placeholder="Logic description..." 
              />
            </div>
          </div>

          <div className="sub-section" style={{ marginTop: '1.5rem' }}>
            <div className="section-header">
              <h4>CRUD Operations</h4>
              <Button variant="ghost" size="sm" onClick={() => actions.addOperation(sIdx)}>+ Custom Op</Button>
            </div>
            {(service.operations || []).map((op, opIdx) => (
              <div key={opIdx} className="operation-card" style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 120px 1fr auto', gap: '1rem', alignItems: 'center' }}>
                  <input style={{ fontWeight: 'bold', background: 'transparent' }} value={op.name} onChange={e => actions.updateOperation(sIdx, opIdx, { name: e.target.value })} />
                  <select style={{ fontSize: '0.75rem', fontWeight: 'bold' }} value={op.type} onChange={e => actions.updateOperation(sIdx, opIdx, { type: e.target.value })}>
                    <option value="create">CREATE</option>
                    <option value="viewAll">LIST</option>
                    <option value="viewBy">GET</option>
                    <option value="updateBy">UPDATE</option>
                    <option value="delete">DELETE</option>
                    <option value="custom">CUSTOM</option>
                  </select>
                  
                  {(op.type === 'viewBy' || op.type === 'updateBy' || op.type === 'delete') ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                      <span style={{ color: '#64748b' }}>By:</span>
                      <select style={{ padding: '0.25rem' }} value={op.criteria} onChange={e => actions.updateOperation(sIdx, opIdx, { criteria: e.target.value })}>
                        <option value="">Field...</option>
                        {(schema.entities.find(e => e.name === service.target_entity)?.attributes || []).map((a, i) => <option key={i} value={a.field_name}>{a.field_name}</option>)}
                      </select>
                    </div>
                  ) : <div />}
                  
                  <Button variant="danger" size="sm" onClick={() => actions.removeOperation(sIdx, opIdx)}>×</Button>
                </div>
                <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px dashed #e2e8f0' }}>
                  <input style={{ background: 'transparent', fontSize: '0.85rem', width: '100%' }} placeholder="Add logic description..." value={op.description} onChange={e => actions.updateOperation(sIdx, opIdx, { description: e.target.value })} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </section>
  );
};
