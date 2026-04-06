import React from 'react';
import type { Relationship, Resource } from '../../global/types/schema';
import { Button } from '../../components/atoms/Button';
import { Title } from '../../components/atoms/Title';
import { Dropdown } from '../../components/atoms/Dropdown';
import { Input } from '../../components/atoms/Input';

interface RelationshipSectionProps {
  relationships: Relationship[];
  resources: Resource[];
  resourceIdx: number;
  onUpdate: (relIdx: number, value: Partial<Relationship>) => void;
  onRemove: (relIdx: number) => void;
  onAdd: () => void;
}

export const RelationshipSection: React.FC<RelationshipSectionProps> = ({ 
  relationships, 
  resources, 
  resourceIdx, 
  onUpdate, 
  onRemove, 
  onAdd 
}) => {
  return (
    <div className="sub-section">
      <div className="sub-header">
        <Title level={3}>Relationships</Title>
        <Button variant="neutral" size="sm" onClick={onAdd}>+ Add Relation</Button>
      </div>
      {(relationships || []).map((rel, relIdx) => (
        <div key={relIdx} className="flex-form" style={{ marginBottom: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
          <Dropdown 
            label="Type"
            value={rel.type} 
            onChange={e => onUpdate(relIdx, { type: e.target.value })}
          >
            <option value="one-to-many">One to Many</option>
            <option value="many-to-one">Many to One</option>
            <option value="one-to-one">One to One</option>
          </Dropdown>
          <Dropdown 
            label="Target Resource"
            value={rel.target_resource} 
            onChange={e => onUpdate(relIdx, { target_resource: e.target.value })}
          >
            <option value="">Select Resource...</option>
            {resources.map((res, idx) => resourceIdx !== idx && <option key={idx} value={res.name}>{res.name}</option>)}
          </Dropdown>
          <Input 
            label="Foreign Key"
            type="text" 
            value={rel.foreign_key} 
            onChange={e => onUpdate(relIdx, { foreign_key: e.target.value })} 
          />
          <div className="flex items-center" style={{ alignSelf: 'flex-end', paddingBottom: '0.5rem' }}>
            <Button variant="delete" size="sm" onClick={() => onRemove(relIdx)}>Remove</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
