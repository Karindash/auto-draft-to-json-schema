import React from 'react';
import { useSchemaStore } from '../../global/store/SchemaContext';
import { Card } from '../../components/molecules/Card';
import { Button } from '../../components/atoms/Button';
import { Title } from '../../components/atoms/Title';
import { Input } from '../../components/atoms/Input';
import { AttributeTable } from './AttributeTable';
import { RelationshipSection } from './RelationshipSection.tsx';

export const ResourceList: React.FC = () => {
  const { schema, actions } = useSchemaStore();
  const { resources } = schema;

  return (
    <div className="feature-section">
      <div className="section-header">
        <Title level={2}>Data Resources</Title>
        <Button variant="add" onClick={actions.addResource}>+ Add Resource</Button>
      </div>

      {(resources || []).map((resource, rIdx) => (
        <Card 
          key={rIdx} 
          title={resource.name} 
          icon="📦"
          headerAction={<Button variant="delete" size="sm" onClick={() => actions.removeResource(rIdx)}>Delete</Button>}
        >
          <div className="flex-form">
            <Input
              label="Resource Name"
              type="text" 
              value={resource.name} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => actions.updateResource(rIdx, { name: e.target.value })} 
            />
            <div className="form-group full-width">
              <label>Description</label>
              <textarea 
                rows={2} 
                value={resource.description} 
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => actions.updateResource(rIdx, { description: e.target.value })} 
              />
            </div>
          </div>

          <AttributeTable 
            attributes={resource.attributes} 
            onAdd={() => actions.addAttribute(rIdx)}
            onUpdate={(aIdx, value) => actions.updateAttribute(rIdx, aIdx, value)}
            onRemove={(aIdx) => actions.removeAttribute(rIdx, aIdx)}
          />

          <RelationshipSection 
            relationships={resource.relationships}
            resources={resources}
            resourceIdx={rIdx}
            onAdd={() => actions.addRelationship(rIdx)}
            onUpdate={(relIdx, value) => actions.updateRelationship(rIdx, relIdx, value)}
            onRemove={(relIdx) => actions.removeRelationship(rIdx, relIdx)}
          />
        </Card>
      ))}
    </div>
  );
};
