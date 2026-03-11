import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type { ProjectSchema, ProjectMetadata, Entity, Attribute, Relationship, Service, ServiceOperation, DTO, DTOField } from '../types/schema';
import { initialSchema } from '../constants/initialState';
import { getRestDefaults, generateOpName } from '../../features/services/utils/restHelpers';

interface SchemaContextType {
  schema: ProjectSchema;
  error: string | null;
  actions: {
    updateMetadata: (field: keyof ProjectMetadata | 'stack', value: any) => void;
    addEntity: () => void;
    updateEntity: (index: number, value: Partial<Entity>) => void;
    removeEntity: (index: number) => void;
    addAttribute: (eIdx: number) => void;
    updateAttribute: (eIdx: number, aIdx: number, value: any) => void;
    removeAttribute: (eIdx: number, aIdx: number) => void;
    addValidation: (eIdx: number, aIdx: number) => void;
    updateValidation: (eIdx: number, aIdx: number, vIdx: number, value: string) => void;
    removeValidation: (eIdx: number, aIdx: number, vIdx: number) => void;
    addRelationship: (eIdx: number) => void;
    updateRelationship: (eIdx: number, rIdx: number, value: any) => void;
    removeRelationship: (eIdx: number, rIdx: number) => void;
    addService: () => void;
    updateService: (sIdx: number, value: any) => void;
    removeService: (sIdx: number) => void;
    addOperation: (sIdx: number) => void;
    updateOperation: (sIdx: number, opIdx: number, value: any) => void;
    removeOperation: (sIdx: number, opIdx: number) => void;
    syncDTOs: () => void;
    updateDTO: (dIdx: number, value: any) => void;
  };
}

const SchemaContext = createContext<SchemaContextType | null>(null);

export const SchemaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schema, setSchema] = useState<ProjectSchema>(initialSchema);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => setError(event.message);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const actions = useMemo(() => ({
    updateMetadata: (field: keyof ProjectMetadata | 'stack', value: any) => {
      setSchema(prev => {
        if (field === 'stack') return { ...prev, project_metadata: { ...prev.project_metadata, stack: { ...prev.project_metadata.stack, ...value } } };
        return { ...prev, project_metadata: { ...prev.project_metadata, [field]: value } };
      });
    },
    addEntity: () => {
      const newEntity: Entity = {
        name: "NewEntity", description: "", attributes: [], relationships: [],
        features: { searchable_fields: [], sortable_fields: [], enable_auth: false, allowed_methods: ["GET", "POST"] }
      };
      setSchema(prev => ({ ...prev, entities: [...(prev.entities || []), newEntity] }));
    },
    updateEntity: (index: number, value: Partial<Entity>) => {
      setSchema(prev => {
        const newEntities = [...(prev.entities || [])];
        newEntities[index] = { ...newEntities[index], ...value };
        return { ...prev, entities: newEntities };
      });
    },
    removeEntity: (index: number) => {
      setSchema(prev => ({ ...prev, entities: (prev.entities || []).filter((_, i) => i !== index) }));
    },
    addAttribute: (entityIndex: number) => {
      const newAttr: Attribute = {
        field_name: "", data_type: "String (VARCHAR)", 
        constraints: { required: false, unique: false, default: null },
        validations: [], ui_hint: { component: "TextInput", placeholder: "", label: "" }
      };
      setSchema(prev => {
        const newEntities = [...(prev.entities || [])];
        newEntities[entityIndex] = { ...newEntities[entityIndex], attributes: [...(newEntities[entityIndex].attributes || []), newAttr] };
        return { ...prev, entities: newEntities };
      });
    },
    updateAttribute: (eIdx: number, aIdx: number, value: any) => {
      setSchema(prev => {
        const newEntities = [...(prev.entities || [])];
        const newAttrs = [...(newEntities[eIdx].attributes || [])];
        newAttrs[aIdx] = { ...newAttrs[aIdx], ...value };
        newEntities[eIdx] = { ...newEntities[eIdx], attributes: newAttrs };
        return { ...prev, entities: newEntities };
      });
    },
    removeAttribute: (eIdx: number, aIdx: number) => {
      setSchema(prev => {
        const newEntities = [...(prev.entities || [])];
        newEntities[eIdx] = { ...newEntities[eIdx], attributes: (newEntities[eIdx].attributes || []).filter((_, i) => i !== aIdx) };
        return { ...prev, entities: newEntities };
      });
    },
    addValidation: (eIdx: number, aIdx: number) => {
      setSchema(prev => {
        const newEntities = [...(prev.entities || [])];
        const newAttrs = [...(newEntities[eIdx].attributes || [])];
        newAttrs[aIdx] = { ...newAttrs[aIdx], validations: [...(newAttrs[aIdx].validations || []), ""] };
        newEntities[eIdx] = { ...newEntities[eIdx], attributes: newAttrs };
        return { ...prev, entities: newEntities };
      });
    },
    updateValidation: (eIdx: number, aIdx: number, vIdx: number, value: string) => {
      setSchema(prev => {
        const newEntities = [...(prev.entities || [])];
        const newAttrs = [...(newEntities[eIdx].attributes || [])];
        const newVals = [...(newAttrs[aIdx].validations || [])];
        newVals[vIdx] = value;
        newAttrs[aIdx] = { ...newAttrs[aIdx], validations: newVals };
        newEntities[eIdx] = { ...newEntities[eIdx], attributes: newAttrs };
        return { ...prev, entities: newEntities };
      });
    },
    removeValidation: (eIdx: number, aIdx: number, vIdx: number) => {
      setSchema(prev => {
        const newEntities = [...(prev.entities || [])];
        const newAttrs = [...(newEntities[eIdx].attributes || [])];
        newAttrs[aIdx] = { ...newAttrs[aIdx], validations: (newAttrs[aIdx].validations || []).filter((_, i) => i !== vIdx) };
        newEntities[eIdx] = { ...newEntities[eIdx], attributes: newAttrs };
        return { ...prev, entities: newEntities };
      });
    },
    addRelationship: (eIdx: number) => {
      const newRel: Relationship = { type: "one-to-many", target_entity: "", foreign_key: "" };
      setSchema(prev => {
        const newEntities = [...(prev.entities || [])];
        newEntities[eIdx] = { ...newEntities[eIdx], relationships: [...(newEntities[eIdx].relationships || []), newRel] };
        return { ...prev, entities: newEntities };
      });
    },
    updateRelationship: (eIdx: number, rIdx: number, value: any) => {
      setSchema(prev => {
        const newEntities = [...(prev.entities || [])];
        const newRels = [...(newEntities[eIdx].relationships || [])];
        newRels[rIdx] = { ...newRels[rIdx], ...value };
        newEntities[eIdx] = { ...newEntities[eIdx], relationships: newRels };
        return { ...prev, entities: newEntities };
      });
    },
    removeRelationship: (eIdx: number, rIdx: number) => {
      setSchema(prev => {
        const newEntities = [...(prev.entities || [])];
        newEntities[eIdx] = { ...newEntities[eIdx], relationships: (newEntities[eIdx].relationships || []).filter((_, i) => i !== rIdx) };
        return { ...prev, entities: newEntities };
      });
    },
    addService: () => {
      const newService: Service = {
        name: "NewService", target_entity: "", description: "",
        operations: [
          { name: 'create', type: 'create', http_method: 'POST', path: '/', criteria: '', selected_attributes: [], description: '' },
          { name: 'viewAll', type: 'viewAll', http_method: 'GET', path: '/', criteria: '', selected_attributes: [], description: '' },
          { name: 'viewBy', type: 'viewBy', http_method: 'GET', path: '/', criteria: 'id', selected_attributes: [], description: '' },
          { name: 'updateBy', type: 'updateBy', http_method: 'PUT', path: '/', criteria: 'id', selected_attributes: [], description: '' },
          { name: 'delete', type: 'delete', http_method: 'DELETE', path: '/', criteria: 'id', selected_attributes: [], isSoftDelete: false, description: '' }
        ]
      };
      setSchema(prev => ({ ...prev, services: [...(prev.services || []), newService] }));
    },
    updateService: (sIdx: number, value: any) => {
      setSchema(prev => {
        const newServices = [...(prev.services || [])];
        let current = { ...newServices[sIdx], ...value };
        if (value.target_entity !== undefined && value.target_entity !== newServices[sIdx].target_entity) {
          const entityName = value.target_entity;
          if (entityName) {
            current.name = `${entityName}Service`;
            current.operations = (current.operations || []).map(op => {
              const rest = getRestDefaults(op.type, entityName, op.criteria);
              return { ...op, name: generateOpName(op.type, entityName, op.criteria), http_method: rest.method, path: rest.path };
            });
          }
        }
        newServices[sIdx] = current;
        return { ...prev, services: newServices };
      });
    },
    removeService: (sIdx: number) => {
      setSchema(prev => ({ ...prev, services: (prev.services || []).filter((_, i) => i !== sIdx) }));
    },
    addOperation: (sIdx: number) => {
      setSchema(prev => {
        const newServices = [...(prev.services || [])];
        const rest = getRestDefaults('custom', newServices[sIdx].target_entity);
        const newOp: ServiceOperation = {
          name: generateOpName('custom', newServices[sIdx].target_entity), type: "custom",
          http_method: rest.method, path: rest.path, criteria: "", selected_attributes: [], description: ""
        };
        newServices[sIdx] = { ...newServices[sIdx], operations: [...(newServices[sIdx].operations || []), newOp] };
        return { ...prev, services: newServices };
      });
    },
    updateOperation: (sIdx: number, opIdx: number, value: any) => {
      setSchema(prev => {
        const newServices = [...(prev.services || [])];
        const newOps = [...(newServices[sIdx].operations || [])];
        let currentOp = { ...newOps[opIdx], ...value };
        if (value.type !== undefined || value.criteria !== undefined) {
          const rest = getRestDefaults(currentOp.type, newServices[sIdx].target_entity, currentOp.criteria);
          currentOp.name = generateOpName(currentOp.type, newServices[sIdx].target_entity, currentOp.criteria);
          currentOp.http_method = rest.method; currentOp.path = rest.path;
        }
        newOps[opIdx] = currentOp;
        newServices[sIdx] = { ...newServices[sIdx], operations: newOps };
        return { ...prev, services: newServices };
      });
    },
    removeOperation: (sIdx: number, opIdx: number) => {
      setSchema(prev => {
        const newServices = [...(prev.services || [])];
        newServices[sIdx] = { ...newServices[sIdx], operations: (newServices[sIdx].operations || []).filter((_, i) => i !== opIdx) };
        return { ...prev, services: newServices };
      });
    },
    syncDTOs: () => {
      setSchema(prev => {
        const newDTOs: DTO[] = [];
        (prev.services || []).forEach(service => {
          const entity = prev.entities.find(e => e.name === service.target_entity);
          if (!entity) return;
          (service.operations || []).forEach(op => {
            if (op.type === 'delete') return;
            let dtoName = ""; let fields: DTOField[] = [];
            const entityFields = (entity.attributes || []).map(a => ({ name: a.field_name, type: a.data_type, required: !!a.constraints?.required }));
            switch (op.type) {
              case 'create': dtoName = `Create${entity.name}Request`; fields = entityFields.filter(f => f.name.toLowerCase() !== 'id'); break;
              case 'viewAll': case 'viewBy': dtoName = `${entity.name}Response`; fields = entityFields; break;
              case 'updateBy': dtoName = `Update${entity.name}Request`; fields = entityFields.map(f => ({ ...f, required: false })); break;
              case 'custom': dtoName = `${op.name.charAt(0).toUpperCase() + op.name.slice(1)}DTO`; fields = entityFields.filter(f => (op.selected_attributes || []).includes(f.name)); break;
            }
            if (dtoName && !newDTOs.find(d => d.name === dtoName)) {
              newDTOs.push({ name: dtoName, base_entity: entity.name, fields, description: `Generated DTO for ${op.name}` });
            }
          });
        });
        return { ...prev, dtos: newDTOs };
      });
    },
    updateDTO: (dIdx: number, value: any) => {
      setSchema(prev => {
        const newDTOs = [...(prev.dtos || [])];
        newDTOs[dIdx] = { ...newDTOs[dIdx], ...value };
        return { ...prev, dtos: newDTOs };
      });
    }
  }), []);

  const value = useMemo(() => ({ schema, error, actions }), [schema, error, actions]);

  return <SchemaContext.Provider value={value}>{children}</SchemaContext.Provider>;
};

export const useSchemaStore = () => {
  const context = useContext(SchemaContext);
  if (!context) throw new Error('useSchemaStore must be used within a SchemaProvider');
  return context;
};
