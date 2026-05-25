import type { ProjectSchema } from '../types/schema';

export const initialSchema: ProjectSchema = {
  project_metadata: {
    name: "Master Draft",
    description: "Sketch schemes, Imagine your own tools. Flexibility among inability.",
    version: "1.0.0",
    stack: {
      language: '',
      framework: '',
      pattern: '',
      architecture: '',
      database: ''
    }
  },
  resources: [
    {
      name: '',
      description: "Application Scheme",
      attributes: [
        {
          field_name: "id",
          data_type: "Long (BIGINT)",
          constraints: { required: true, unique: true, default: null },
          validations: ["Primary Key"],
          ui_hint: { component: "HiddenInput", placeholder: "", label: "ID" }
        }
      ],
      relationships: [],
      features: {
        searchable_fields: [],
        sortable_fields: [],
        enable_auth: true,
        allowed_methods: ["GET", "POST", "PUT", "DELETE"]
      }
    }
  ],
  services: [],
  global_settings: {
    auth_provider: "none",
    theme: "light",
    export_formats: ["json"]
  },
  status_codes: [200, 400, 409, 500]
};
