import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type { ProjectSchema } from '../types/schema';
import { initialSchema } from '../constants/initialState';
import { useMetadataActions } from '../../features/project-meta/useMetadataActions';
import { useResourceActions } from '../../features/resources/useResourceActions';
import { useServiceActions } from '../../features/services/useServiceActions';

interface SchemaContextType {
  schema: ProjectSchema;
  currentLayer: number;
  error: string | null;
  actions: ReturnType<typeof useMetadataActions> & 
           ReturnType<typeof useResourceActions> & 
           ReturnType<typeof useServiceActions> & {
    setLayer: (layer: number) => void;
    nextLayer: () => void;
    prevLayer: () => void;
    saveProject: () => void;
    resetProject: () => void;
    deleteProject: () => void;
  };
}

const SchemaContext = createContext<SchemaContextType | null>(null);

const STORAGE_KEY = 'drafter_project_schema';

export const SchemaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schema, setSchema] = useState<ProjectSchema>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialSchema;
  });
  const [currentLayer, setCurrentLayer] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => setError(event.message);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const metadataActions = useMetadataActions(setSchema);
  const resourceActions = useResourceActions(setSchema);
  const serviceActions = useServiceActions(setSchema);

  const saveProject = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
    alert('Project saved successfully!');
  };

  const resetProject = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSchema(JSON.parse(saved));
    } else {
      setSchema(initialSchema);
    }
  };

  const deleteProject = () => {
    if (window.confirm('Are you sure you want to delete this project from local storage?')) {
      localStorage.removeItem(STORAGE_KEY);
      setSchema(initialSchema);
    }
  };

  const actions = useMemo(() => ({
    ...metadataActions,
    ...resourceActions,
    ...serviceActions,
    setLayer: (layer: number) => setCurrentLayer(layer),
    nextLayer: () => setCurrentLayer(prev => Math.min(prev + 1, 3)),
    prevLayer: () => setCurrentLayer(prev => Math.max(prev - 1, 0)),
    saveProject,
    resetProject,
    deleteProject,
  }), [metadataActions, resourceActions, serviceActions, schema]);

  const value = useMemo(() => ({ schema, currentLayer, error, actions }), [schema, currentLayer, error, actions]);

  return <SchemaContext.Provider value={value}>{children}</SchemaContext.Provider>;
};

export const useSchemaStore = () => {
  const context = useContext(SchemaContext);
  if (!context) throw new Error('useSchemaStore must be used within a SchemaProvider');
  return context;
};
