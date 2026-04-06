import React from 'react';
import { useSchemaStore } from '../../global/store/SchemaContext';
import { Card } from '../../components/molecules/Card';
import { Input } from '../../components/atoms/Input';
import { Dropdown } from '../../components/atoms/Dropdown';
import architectureOptions from '../../global/constants/options.json';

export const ProjectMetaEditor: React.FC = () => {
  const { schema, actions } = useSchemaStore();
  const { project_metadata: meta } = schema;

  return (
    <Card title="Project Metadata" icon="📁">
      <div className="flex-form">
        <Input 
          label="Project Name"
          type="text" 
          value={meta.name} 
          onChange={e => actions.updateMetadata('name', e.target.value)} 
          placeholder="e.g. My API Service" 
        />
        <Input 
          label="Version"
          type="text" 
          value={meta.version} 
          onChange={e => actions.updateMetadata('version', e.target.value)} 
        />
        <div className="form-group full-width">
          <label>Description</label>
          <textarea 
            rows={3} 
            value={meta.description} 
            onChange={e => actions.updateMetadata('description', e.target.value)} 
            placeholder="What does this project do?" 
          />
        </div>
        <Dropdown
          label="Architecture Pattern"
          value={meta.stack.pattern}
          onChange={e => actions.updateMetadata('stack', { pattern: e.target.value })}
        >
          <option value="">Select Pattern...</option>
          {architectureOptions.patterns.map((p, i) => (
            <option key={i} value={p}>{p}</option>
          ))}
        </Dropdown>
        <Dropdown
          label="Structure Architecture"
          value={meta.stack.architecture}
          onChange={e => actions.updateMetadata('stack', { architecture: e.target.value })}
        >
          <option value="">Select Structure...</option>
          {architectureOptions.structures.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </Dropdown>
        <Dropdown
          label="Framework"
          value={meta.stack.framework} 
          onChange={e => actions.updateMetadata('stack', { framework: e.target.value })} 
        >
          <option value="">Select Framework...</option>
          {architectureOptions.frameworks.map((f, i) => (
            <option key={i} value={f}>{f}</option>
          ))}
        </Dropdown>
        <Dropdown
          label="Language"
          value={meta.stack.language} 
          onChange={e => actions.updateMetadata('stack', { language: e.target.value })} 
        >
          <option value="">Select language...</option>
          {architectureOptions.language.map((f, i) => (
            <option key={i} value={f}>{f}</option>
          ))}
        </Dropdown>
        <Dropdown
          label="Database"
          value={meta.stack.database} 
          onChange={e => actions.updateMetadata('stack', { database: e.target.value })} 
        >
          <option value="">Select Database...</option>
          {architectureOptions.database.map((f, i) => (
            <option key={i} value={f}>{f}</option>
          ))}
        </Dropdown>
      </div>
    </Card>
  );
};
