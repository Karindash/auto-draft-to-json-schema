import type { ProjectSchema } from '../types/schema';

export const initialSchema: ProjectSchema = {
  project_metadata: {
    name: "My Awesome Project",
    description: "A new project generated with Drafter",
    version: "1.0.0",
    stack: {
      frontend: "React",
      backend: "Spring Boot (Java)",
      database: "PostgreSQL"
    }
  },
  entities: [
    {
      name: "User",
      description: "Application users",
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
  dtos: [],
  global_settings: {
    auth_provider: "none",
    theme: "light",
    export_formats: ["json"]
  }
};
