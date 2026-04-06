import React from 'react';
import type { ServiceOperation } from '../../global/types/schema';
import { Button } from '../../components/atoms/Button';
import { Title } from '../../components/atoms/Title';
import { Dropdown } from '../../components/atoms/Dropdown';

interface OperationTableProps {
  operations: ServiceOperation[];
  onUpdate: (opIdx: number, value: any) => void;
  onRemove: (opIdx: number) => void;
  onAdd: () => void;
}

export const OperationTable: React.FC<OperationTableProps> = ({ operations, onUpdate, onRemove, onAdd }) => {
  return (
    <div className="sub-section">
      <div className="sub-header">
        <Title level={3}>Operations</Title>
        <Button variant="neutral" size="sm" onClick={onAdd}>+ Add Operation</Button>
      </div>
      
      <table className="data-table">
        <thead>
          <tr>
            <th>Method</th>
            <th>Path</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(operations || []).map((op, opIdx) => (
            <tr key={opIdx}>
              <td><span className={`method-badge ${op.http_method}`}>{op.http_method}</span></td>
              <td><code>{op.path}</code></td>
              <td>
                <Dropdown 
                  noWrapper
                  value={op.type} 
                  onChange={e => onUpdate(opIdx, { type: e.target.value })}
                >
                  <option value="create">Create</option>
                  <option value="viewAll">View All</option>
                  <option value="viewBy">View By</option>
                  <option value="updateBy">Update By</option>
                  <option value="delete">Delete</option>
                  <option value="custom">Custom</option>
                </Dropdown>
              </td>
              <td>
                <Button variant="delete" size="sm" onClick={() => onRemove(opIdx)}>×</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
