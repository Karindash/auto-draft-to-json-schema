import React from 'react';
import type { Resource, Attribute, Relationship } from './ResourceTypes';
import type { ProjectSchema } from '../../global/types/schema';

export const useResourceActions = (setSchema: React.Dispatch<React.SetStateAction<ProjectSchema>>) => {
  return {
    addResource: () => {
      const newResource: Resource = {
        name: "NewResource", description: "", attributes: [], relationships: [],
        features: { searchable_fields: [], sortable_fields: [], enable_auth: false, allowed_methods: ["GET", "POST"] }
      };
      setSchema((prev: ProjectSchema) => ({ ...prev, resources: [...(prev.resources || []), newResource] }));
    },
    updateResource: (index: number, value: Partial<Resource>) => {
      setSchema((prev: ProjectSchema) => {
        const newResources = [...(prev.resources || [])];
        newResources[index] = { ...newResources[index], ...value };
        return { ...prev, resources: newResources };
      });
    },
    removeResource: (index: number) => {
      setSchema((prev: ProjectSchema) => ({ ...prev, resources: (prev.resources || []).filter((_r: Resource, i: number) => i !== index) }));
    },
    addAttribute: (resourceIndex: number) => {
      const newAttr: Attribute = {
        field_name: "", data_type: "String (VARCHAR)", 
        constraints: { required: false, unique: false, default: null },
        validations: [], ui_hint: { component: "TextInput", placeholder: "", label: "" }
      };
      setSchema((prev: ProjectSchema) => {
        const newResources = [...(prev.resources || [])];
        newResources[resourceIndex] = { ...newResources[resourceIndex], attributes: [...(newResources[resourceIndex].attributes || []), newAttr] };
        return { ...prev, resources: newResources };
      });
    },
    updateAttribute: (rIdx: number, aIdx: number, value: Partial<Attribute>) => {
      setSchema((prev: ProjectSchema) => {
        const newResources = [...(prev.resources || [])];
        const newAttrs = [...(newResources[rIdx].attributes || [])];
        newAttrs[aIdx] = { ...newAttrs[aIdx], ...value } as Attribute;
        newResources[rIdx] = { ...newResources[rIdx], attributes: newAttrs };
        return { ...prev, resources: newResources };
      });
    },
    removeAttribute: (rIdx: number, aIdx: number) => {
      setSchema((prev: ProjectSchema) => {
        const newResources = [...(prev.resources || [])];
        newResources[rIdx] = { ...newResources[rIdx], attributes: (newResources[rIdx].attributes || []).filter((_a: Attribute, i: number) => i !== aIdx) };
        return { ...prev, resources: newResources };
      });
    },
    addValidation: (rIdx: number, aIdx: number) => {
      setSchema((prev: ProjectSchema) => {
        const newResources = [...(prev.resources || [])];
        const newAttrs = [...(newResources[rIdx].attributes || [])];
        newAttrs[aIdx] = { ...newAttrs[aIdx], validations: [...(newAttrs[aIdx].validations || []), ""] };
        newResources[rIdx] = { ...newResources[rIdx], attributes: newAttrs };
        return { ...prev, resources: newResources };
      });
    },
    updateValidation: (rIdx: number, aIdx: number, vIdx: number, value: string) => {
      setSchema((prev: ProjectSchema) => {
        const newResources = [...(prev.resources || [])];
        const newAttrs = [...(newResources[rIdx].attributes || [])];
        const newVals = [...(newAttrs[aIdx].validations || [])];
        newVals[vIdx] = value;
        newAttrs[aIdx] = { ...newAttrs[aIdx], validations: newVals };
        newResources[rIdx] = { ...newResources[rIdx], attributes: newAttrs };
        return { ...prev, resources: newResources };
      });
    },
    removeValidation: (rIdx: number, aIdx: number, vIdx: number) => {
      setSchema((prev: ProjectSchema) => {
        const newResources = [...(prev.resources || [])];
        const newAttrs = [...(newResources[rIdx].attributes || [])];
        newAttrs[aIdx] = { ...newAttrs[aIdx], validations: (newAttrs[aIdx].validations || []).filter((_v: string, i: number) => i !== vIdx) };
        newResources[rIdx] = { ...newResources[rIdx], attributes: newAttrs };
        return { ...prev, resources: newResources };
      });
    },
    addRelationship: (rIdx: number) => {
      const newRel: Relationship = { type: "one-to-many", target_resource: "", foreign_key: "" };
      setSchema((prev: ProjectSchema) => {
        const newResources = [...(prev.resources || [])];
        newResources[rIdx] = { ...newResources[rIdx], relationships: [...(newResources[rIdx].relationships || []), newRel] };
        return { ...prev, resources: newResources };
      });
    },
    updateRelationship: (rIdx: number, relIdx: number, value: Partial<Relationship>) => {
      setSchema((prev: ProjectSchema) => {
        const newResources = [...(prev.resources || [])];
        const newRels = [...(newResources[rIdx].relationships || [])];
        newRels[relIdx] = { ...newRels[relIdx], ...value } as Relationship;
        newResources[rIdx] = { ...newResources[rIdx], relationships: newRels };
        return { ...prev, resources: newResources };
      });
    },
    removeRelationship: (rIdx: number, relIdx: number) => {
      setSchema((prev: ProjectSchema) => {
        const newResources = [...(prev.resources || [])];
        newResources[rIdx] = { ...newResources[rIdx], relationships: (newResources[rIdx].relationships || []).filter((_rel: Relationship, i: number) => i !== relIdx) };
        return { ...prev, resources: newResources };
      });
    }
  };
};
