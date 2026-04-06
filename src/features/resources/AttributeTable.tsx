import React from 'react';
import type { Attribute } from '../../global/types/schema';
import { Button } from '../../components/atoms/Button';
import { Title } from '../../components/atoms/Title';
import { Input } from '../../components/atoms/Input';
import { Dropdown } from '../../components/atoms/Dropdown';

interface AttributeTableProps {
  attributes: Attribute[];
  onUpdate: (aIdx: number, value: Partial<Attribute>) => void;
  onRemove: (aIdx: number) => void;
  onAdd: () => void;
}

export const AttributeTable: React.FC<AttributeTableProps> = ({ attributes, onUpdate, onRemove, onAdd }) => {
  return (
    <div className="sub-section">
      <div className="sub-header">
        <Title level={3}>Attributes</Title>
        <Button variant="neutral" size="sm" onClick={onAdd}>+ Add Attribute</Button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Field Name</th>
            <th>Data Type</th>
            <th>Required</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(attributes || []).map((attr, aIdx) => (
            <tr key={aIdx}>
              <td>
                <Input 
                  noWrapper
                  type="text" 
                  value={attr.field_name} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(aIdx, { field_name: e.target.value })} 
                />
              </td>
              <td>
                <Dropdown 
                  noWrapper
                  value={attr.data_type} 
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onUpdate(aIdx, { data_type: e.target.value })}
                >
                  <option>String (VARCHAR)</option>
                  <option>Long (BIGINT)</option>
                  <option>Integer (INT)</option>
                  <option>Boolean (BIT)</option>
                  <option>Date (TIMESTAMP)</option>
                </Dropdown>
              </td>
              <td>
                <input 
                  type="checkbox" 
                  checked={attr.constraints.required} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(aIdx, { constraints: { ...attr.constraints, required: e.target.checked } })} 
                />
              </td>
              <td>
                <Button variant="delete" size="sm" onClick={() => onRemove(aIdx)}>×</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};
