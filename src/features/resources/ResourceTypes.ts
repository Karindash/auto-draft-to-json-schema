export interface Attribute {
  field_name: string;
  data_type: string;
  constraints: {
    required: boolean;
    unique: boolean;
    default: unknown;
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
  target_resource: string;
  foreign_key: string;
}

export interface Resource {
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