export interface ProjectMetadata {
  name: string;
  description: string;
  version: string;
  stack: {
    frontend: string;
    backend: string;
    database: string;
  };
}

export interface Attribute {
  field_name: string;
  data_type: string;
  constraints: {
    required: boolean;
    unique: boolean;
    default: any;
  };
  validations: string[];
  ui_hint: {
    component: string;
    placeholder: string;
    label: string;
  };
}

export interface Relationship {
  type: string;
  target_entity: string;
  foreign_key: string;
}

export interface Entity {
  name: string;
  description: string;
  attributes: Attribute[];
  relationships: Relationship[];
  features: {
    searchable_fields: string[];
    sortable_fields: string[];
    enable_auth: boolean;
    allowed_methods: string[];
  };
}

export interface GlobalSettings {
  auth_provider: string;
  theme: 'light' | 'dark';
  export_formats: string[];
}

export interface ServiceOperation {
  name: string;
  type: 'create' | 'viewBy' | 'viewAll' | 'updateBy' | 'delete' | 'custom';
  http_method: string;
  path: string;
  criteria: string;
  selected_attributes: string[];
  isSoftDelete?: boolean;
  description: string;
}

export interface Service {
  name: string;
  target_entity: string;
  operations: ServiceOperation[];
  description: string;
}

export interface DTOField {
  name: string;
  type: string;
  required: boolean;
}

export interface DTO {
  name: string;
  base_entity: string;
  fields: DTOField[];
  description: string;
}

export interface ProjectSchema {
  project_metadata: ProjectMetadata;
  entities: Entity[];
  services: Service[];
  dtos: DTO[];
  global_settings: GlobalSettings;
}
