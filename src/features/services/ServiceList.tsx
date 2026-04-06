import React from 'react';
import { useSchemaStore } from '../../global/store/SchemaContext';
import { Card } from '../../components/molecules/Card';
import { Button } from '../../components/atoms/Button';
import { Title } from '../../components/atoms/Title';
import { Input } from '../../components/atoms/Input';
import { Dropdown } from '../../components/atoms/Dropdown';
import { OperationTable } from './OperationTable';

export const ServiceList: React.FC = () => {
  const { schema, actions } = useSchemaStore();
  const { services, resources } = schema;

  return (
    <div className="feature-section">
      <div className="section-header">
        <Title level={2}>Business Services</Title>
        <Button variant="add" onClick={actions.addService}>+ Add Service</Button>
      </div>

      {(services || []).map((service, sIdx) => (
        <Card 
          key={sIdx} 
          title={service.name} 
          icon="⚙️"
          headerAction={<Button variant="delete" size="sm" onClick={() => actions.removeService(sIdx)}>Delete</Button>}
        >
          <div className="flex-form">
            <Input
              label="Service Name"
              type="text" 
              value={service.name} 
              onChange={e => actions.updateService(sIdx, { name: e.target.value })} 
            />
            <Dropdown
              label="Target Resource"
              value={service.target_resource} 
              onChange={e => actions.updateService(sIdx, { target_resource: e.target.value })}
            >
              <option value="">Select Resource...</option>
              {resources.map((res, idx) => (
                <option key={idx} value={res.name}>{res.name}</option>
              ))}
            </Dropdown>
            <div className="form-group full-width">
              <label>Description</label>
              <textarea 
                rows={2} 
                value={service.description} 
                onChange={e => actions.updateService(sIdx, { description: e.target.value })} 
              />
            </div>
          </div>

          <OperationTable 
            operations={service.operations}
            onAdd={() => actions.addOperation(sIdx)}
            onUpdate={(opIdx, value) => actions.updateOperation(sIdx, opIdx, value)}
            onRemove={(opIdx) => actions.removeOperation(sIdx, opIdx)}
          />
        </Card>
      ))}
    </div>
  );
};
