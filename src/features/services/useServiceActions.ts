import React from 'react';
import type { Service, ServiceOperation } from './ServiceType';
import type { ProjectSchema } from '../../global/types/schema';
import { getRestDefaults, generateOpName } from '../../global/utils/restHelpers';

export const useServiceActions = (setSchema: React.Dispatch<React.SetStateAction<ProjectSchema>>) => {
  return {
    addService: () => {
      const newService: Service = {
        name: "NewService", target_resource: "", description: "",
        operations: [
          { name: 'create', type: 'create', http_method: 'POST', path: '/', criteria: '', selected_attributes: [], description: '' },
          { name: 'viewAll', type: 'viewAll', http_method: 'GET', path: '/', criteria: '', selected_attributes: [], description: '' },
          { name: 'viewBy', type: 'viewBy', http_method: 'GET', path: '/', criteria: 'id', selected_attributes: [], description: '' },
          { name: 'updateBy', type: 'updateBy', http_method: 'PUT', path: '/', criteria: 'id', selected_attributes: [], description: '' },
          { name: 'delete', type: 'delete', http_method: 'DELETE', path: '/', criteria: 'id', selected_attributes: [], isSoftDelete: false, description: '' }
        ]
      };
      setSchema((prev: ProjectSchema) => ({ ...prev, services: [...(prev.services || []), newService] }));
    },
    updateService: (sIdx: number, value: any) => {
      setSchema((prev: ProjectSchema) => {
        const newServices = [...(prev.services || [])];
        const current = { ...newServices[sIdx], ...value };
        if (value.target_resource !== undefined && value.target_resource !== newServices[sIdx].target_resource) {
          const resourceName = value.target_resource;
          if (resourceName) {
            current.name = `${resourceName}Service`;
            current.operations = (current.operations || []).map((op: ServiceOperation) => {
              const rest = getRestDefaults(op.type, resourceName, op.criteria);
              return { ...op, name: generateOpName(op.type, resourceName, op.criteria), http_method: rest.method, path: rest.path };
            });
          }
        }
        newServices[sIdx] = current;
        return { ...prev, services: newServices };
      });
    },
    removeService: (sIdx: number) => {
      setSchema((prev: ProjectSchema) => ({ ...prev, services: (prev.services || []).filter((_, i) => i !== sIdx) }));
    },
    addOperation: (sIdx: number) => {
      setSchema((prev: ProjectSchema) => {
        const newServices = [...(prev.services || [])];
        const rest = getRestDefaults('custom', newServices[sIdx].target_resource);
        const newOp: ServiceOperation = {
          name: generateOpName('custom', newServices[sIdx].target_resource), type: "custom",
          http_method: rest.method, path: rest.path, criteria: "", selected_attributes: [], description: ""
        };
        newServices[sIdx] = { ...newServices[sIdx], operations: [...(newServices[sIdx].operations || []), newOp] };
        return { ...prev, services: newServices };
      });
    },
    updateOperation: (sIdx: number, opIdx: number, value: any) => {
      setSchema((prev: ProjectSchema) => {
        const newServices = [...(prev.services || [])];
        const newOps = [...(newServices[sIdx].operations || [])];
        const currentOp = { ...newOps[opIdx], ...value };
        if (value.type !== undefined || value.criteria !== undefined) {
          const rest = getRestDefaults(currentOp.type, newServices[sIdx].target_resource, currentOp.criteria);
          currentOp.name = generateOpName(currentOp.type, newServices[sIdx].target_resource, currentOp.criteria);
          currentOp.http_method = rest.method; currentOp.path = rest.path;
        }
        newOps[opIdx] = currentOp;
        newServices[sIdx] = { ...newServices[sIdx], operations: newOps };
        return { ...prev, services: newServices };
      });
    },
    removeOperation: (sIdx: number, opIdx: number) => {
      setSchema((prev: ProjectSchema) => {
        const newServices = [...(prev.services || [])];
        newServices[sIdx] = { ...newServices[sIdx], operations: (newServices[sIdx].operations || []).filter((_, i) => i !== opIdx) };
        return { ...prev, services: newServices };
      });
    }
  };
};
