import React from 'react';
import type { ProjectMetadata } from './ProjectMetaTypes.ts';
import type { ProjectSchema } from '../../global/types/schema';

export const useMetadataActions = (setSchema: React.Dispatch<React.SetStateAction<ProjectSchema>>) => {
  return {
    updateMetadata: (field: keyof ProjectMetadata | 'stack', value: any) => {
      setSchema((prev: ProjectSchema) => {
        if (field === 'stack') {
          return {
            ...prev,
            project_metadata: {
              ...prev.project_metadata,
              stack: { ...prev.project_metadata.stack, ...value }
            }
          };
        }
        return {
          ...prev,
          project_metadata: { ...prev.project_metadata, [field]: value } as ProjectMetadata
        };
      });
    }
  };
};
