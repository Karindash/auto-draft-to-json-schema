import type { ProjectMetadata } from "../../features/project-meta/ProjectMetaTypes";
import type { Resource, Attribute, Relationship } from "../../features/resources/ResourceTypes";
import type { Service, ServiceOperation } from "../../features/services/ServiceType";

export type { ProjectMetadata, Resource, Attribute, Relationship, Service, ServiceOperation };

export interface GlobalSettings {
  auth_provider: string;
  theme: 'light' | 'dark';
  export_formats: string[];
}

export interface ProjectSchema {
  project_metadata: ProjectMetadata;
  resources: Resource[];
  services: Service[];
  global_settings: GlobalSettings;
  status_codes: number[];
}
