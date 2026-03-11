import React from 'react';
import { useSchemaStore } from '../../../core/store/SchemaContext';
import { Card } from '../../../shared/components/Card';

export const ProjectMetaEditor: React.FC = () => {
  const { schema, actions } = useSchemaStore();
  const { project_metadata: meta } = schema;

  return (
    <Card title="Project Metadata" icon="📁">
      <div className="form-grid">
        <div className="form-group">
          <label>Project Name</label>
          <input 
            type="text" 
            value={meta.name} 
            onChange={e => actions.updateMetadata('name', e.target.value)} 
            placeholder="e.g. My API Service" 
          />
        </div>
        <div className="form-group">
          <label>Version</label>
          <input 
            type="text" 
            value={meta.version} 
            onChange={e => actions.updateMetadata('version', e.target.value)} 
          />
        </div>
        <div className="form-group full-width">
          <label>Description</label>
          <textarea 
            rows={3} 
            value={meta.description} 
            onChange={e => actions.updateMetadata('description', e.target.value)} 
            placeholder="What does this project do?" 
          />
        </div>
        <div className="form-group">
          <label>Frontend</label>
          <input 
            type="text" 
            value={meta.stack.frontend} 
            onChange={e => actions.updateMetadata('stack', { frontend: e.target.value })} 
          />
        </div>
        <div className="form-group">
          <label>Backend</label>
          <input 
            type="text" 
            value={meta.stack.backend} 
            onChange={e => actions.updateMetadata('stack', { backend: e.target.value })} 
          />
        </div>
        <div className="form-group">
          <label>Database</label>
          <input 
            type="text" 
            value={meta.stack.database} 
            onChange={e => actions.updateMetadata('stack', { database: e.target.value })} 
          />
        </div>
      </div>
    </Card>
  );
};
