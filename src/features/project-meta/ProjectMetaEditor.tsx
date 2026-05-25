import React from 'react';
import { useSchemaStore } from '../../global/store/SchemaContext';
import { Card } from '../../components/molecules/Card';
import { Title } from '../../components/atoms/Title';
import { Input } from '../../components/atoms/Input';
import { Dropdown } from '../../components/atoms/Dropdown';
import stackData from '../../../data/stack.json';
import options from '../../global/constants/options.json';

export const ProjectMetaEditor: React.FC = () => {
  const { schema, actions } = useSchemaStore();
  const { project_metadata: meta } = schema;

  // Find the selected language object to get its frameworks
  const selectedLanguage = stackData.language.find(l => l.name === meta.stack.language);
  
  // Find the selected framework object to get its structures and patterns
  const selectedFramework = selectedLanguage?.frameworks.find(f => f.name === meta.stack.framework);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    actions.updateMetadata('stack', { 
      language: newLang,
      framework: '', // Reset framework when language changes
      architecture: '',
      pattern: ''
    });
  };

  const handleFrameworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    actions.updateMetadata('stack', { 
      framework: e.target.value,
      architecture: '', // Reset structure/pattern when framework changes
      pattern: ''
    });
  };

  return (
    <div>
      <Title level={2}>Project Metadata</Title>
      <Card>
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

          {/* 1. Language Dropdown */}
          <Dropdown
            label="Language"
            value={meta.stack.language}
            onChange={handleLanguageChange}
          >
            <option value="">Select language...</option>
            {stackData.language.map((l, i) => (
              <option key={i} value={l.name}>{l.name}</option>
            ))}
          </Dropdown>

          {/* 2. Framework Dropdown (Dependent on Language) */}
          <Dropdown
            label="Framework"
            value={meta.stack.framework} 
            onChange={handleFrameworkChange}
            disabled={!meta.stack.language}
          >
            <option value="">Select Framework...</option>
            {selectedLanguage?.frameworks.map((f, i) => (
              <option key={i} value={f.name}>{f.name}</option>
            ))}
          </Dropdown>

          {/* 3. Structure Architecture Dropdown (Dependent on Framework) */}
          <Dropdown
            label="Structure Architecture"
            value={meta.stack.architecture}
            onChange={e => actions.updateMetadata('stack', { architecture: e.target.value })}
            disabled={!meta.stack.framework}
          >
            <option value="">Select Structure...</option>
            {selectedFramework?.structures.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </Dropdown>

          {/* 4. Architecture Pattern Dropdown (Dependent on Framework) */}
          <Dropdown
            label="Architecture Pattern"
            value={meta.stack.pattern}
            onChange={e => actions.updateMetadata('stack', { pattern: e.target.value })}
            disabled={!meta.stack.framework}
          >
            <option value="">Select Pattern...</option>
            {selectedFramework?.patterns.map((p, i) => (
              <option key={i} value={p}>{p}</option>
            ))}
          </Dropdown>

          {/* 5. Database Dropdown (Independent) */}
          <Dropdown
            label="Database"
            value={meta.stack.database}
            onChange={e => actions.updateMetadata('stack', { database: e.target.value })}
          >
            <option value="">Select Database...</option>
            {options.database.map((db, i) => (
              <option key={i} value={db}>{db}</option>
            ))}
          </Dropdown>
        </div>
        {selectedLanguage && (
          <div className="info-box" style={{ marginTop: '1rem', padding: '0.5rem', background: '#f0f4f8', borderRadius: '4px', fontSize: '0.85rem' }}>
            <strong>💡 About {selectedLanguage.name}:</strong> {selectedLanguage.description}
          </div>
        )}
      </Card>
    </div>  
  );
};
