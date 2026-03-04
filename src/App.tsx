import { useState, useMemo } from 'react';
import './App.css';

interface ProjectMetadata {
  name: string;
  description: string;
  version: string;
  stack: {
    frontend: string;
    backend: string;
    database: string;
  };
}

interface Attribute {
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

interface Relationship {
  type: string;
  target_entity: string;
  foreign_key: string;
}

interface Entity {
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

interface GlobalSettings {
  auth_provider: string;
  theme: 'light' | 'dark';
  export_formats: string[];
}

interface ServiceOperation {
  name: string;
  type: 'create' | 'viewBy' | 'viewAll' | 'updateBy' | 'delete' | 'custom';
  criteria: string;
  selected_attributes: string[];
  isSoftDelete?: boolean;
  description: string;
}

interface Service {
  name: string;
  target_entity: string;
  operations: ServiceOperation[];
  description: string;
}

interface DTOField {
  name: string;
  type: string;
  required: boolean;
}

interface DTO {
  name: string;
  base_entity: string;
  fields: DTOField[];
  description: string;
}

interface ProjectSchema {
  project_metadata: ProjectMetadata;
  entities: Entity[];
  services: Service[];
  dtos: DTO[];
  global_settings: GlobalSettings;
}

const initialSchema: ProjectSchema = {
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
        },
        {
          field_name: "email",
          data_type: "String (VARCHAR)",
          constraints: { required: true, unique: true, default: null },
          validations: ["Must be a valid corporate @google.com email address"],
          ui_hint: { component: "EmailInput", placeholder: "Enter email", label: "Email Address" }
        }
      ],
      relationships: [],
      features: {
        searchable_fields: ["email"],
        sortable_fields: ["email"],
        enable_auth: true,
        allowed_methods: ["GET", "POST", "PUT", "DELETE"]
      }
    }
  ],
  services: [
    {
      name: "UserService",
      target_entity: "User",
      description: "Standard User CRUD API",
      operations: [
        { name: 'createUser', type: 'create', criteria: '', selected_attributes: [], description: 'Create a new user' },
        { name: 'getAllUsers', type: 'viewAll', criteria: '', selected_attributes: [], description: 'List all users' },
        { name: 'getUserById', type: 'viewBy', criteria: 'id', selected_attributes: [], description: 'Find user by ID' },
        { name: 'updateUserById', type: 'updateBy', criteria: 'id', selected_attributes: [], description: 'Update user by ID' },
        { name: 'deleteUser', type: 'delete', criteria: 'id', selected_attributes: [], isSoftDelete: false, description: 'Delete user' }
      ]
    }
  ],
  dtos: [],
  global_settings: {
    auth_provider: "none",
    theme: "light",
    export_formats: ["json"]
  }
};

const generateOpName = (type: string, entityName: string, criteria: string = "") => {
  if (!entityName) return "";
  const capitalized = entityName.charAt(0).toUpperCase() + entityName.slice(1);
  const crit = criteria ? `By${criteria.charAt(0).toUpperCase() + criteria.slice(1)}` : "";
  
  switch (type) {
    case 'create': return `create${capitalized}`;
    case 'viewAll': return `getAll${capitalized}s`;
    case 'viewBy': return `get${capitalized}${crit}`;
    case 'updateBy': return `update${capitalized}${crit}`;
    case 'delete': return `delete${capitalized}`;
    default: return `custom${capitalized}Op`;
  }
};

function App() {
  const [schema, setSchema] = useState<ProjectSchema>(initialSchema);

  const updateMetadata = (field: keyof ProjectMetadata | 'stack', value: any) => {
    setSchema(prev => {
      if (field === 'stack') {
        return { ...prev, project_metadata: { ...prev.project_metadata, stack: { ...prev.project_metadata.stack, ...value } } };
      }
      return { ...prev, project_metadata: { ...prev.project_metadata, [field]: value } };
    });
  };

  const addEntity = () => {
    const newEntity: Entity = {
      name: "NewEntity",
      description: "",
      attributes: [],
      relationships: [],
      features: {
        searchable_fields: [],
        sortable_fields: [],
        enable_auth: false,
        allowed_methods: ["GET", "POST"]
      }
    };
    setSchema(prev => ({ ...prev, entities: [...prev.entities, newEntity] }));
  };

  const updateEntity = (index: number, value: Partial<Entity>) => {
    setSchema(prev => {
      const newEntities = [...prev.entities];
      newEntities[index] = { ...newEntities[index], ...value };
      return { ...prev, entities: newEntities };
    });
  };

  const removeEntity = (index: number) => {
    setSchema(prev => ({ ...prev, entities: prev.entities.filter((_, i) => i !== index) }));
  };

  const addAttribute = (entityIndex: number) => {
    const newAttr: Attribute = {
      field_name: "",
      data_type: "String (VARCHAR)",
      constraints: { required: false, unique: false, default: null },
      validations: [],
      ui_hint: { component: "TextInput", placeholder: "", label: "" }
    };
    setSchema(prev => {
      const newEntities = [...prev.entities];
      newEntities[entityIndex] = {
        ...newEntities[entityIndex],
        attributes: [...(newEntities[entityIndex].attributes || []), newAttr]
      };
      return { ...prev, entities: newEntities };
    });
  };

  const updateAttribute = (entityIndex: number, attrIndex: number, value: Partial<Attribute>) => {
    setSchema(prev => {
      const newEntities = [...prev.entities];
      const newAttrs = [...(newEntities[entityIndex].attributes || [])];
      newAttrs[attrIndex] = { ...newAttrs[attrIndex], ...value };
      newEntities[entityIndex] = {
        ...newEntities[entityIndex],
        attributes: newAttrs
      };
      return { ...prev, entities: newEntities };
    });
  };

  const removeAttribute = (entityIndex: number, attrIndex: number) => {
    setSchema(prev => {
      const newEntities = [...prev.entities];
      newEntities[entityIndex] = {
        ...newEntities[entityIndex],
        attributes: (newEntities[entityIndex].attributes || []).filter((_, i) => i !== attrIndex)
      };
      return { ...prev, entities: newEntities };
    });
  };

  const addValidation = (entityIndex: number, attrIndex: number) => {
    setSchema(prev => {
      const newEntities = [...prev.entities];
      const newAttrs = [...(newEntities[entityIndex].attributes || [])];
      newAttrs[attrIndex] = {
        ...newAttrs[attrIndex],
        validations: [...(newAttrs[attrIndex].validations || []), ""]
      };
      newEntities[entityIndex] = { ...newEntities[entityIndex], attributes: newAttrs };
      return { ...prev, entities: newEntities };
    });
  };

  const updateValidation = (entityIndex: number, attrIndex: number, vIdx: number, value: string) => {
    setSchema(prev => {
      const newEntities = [...prev.entities];
      const newAttrs = [...(newEntities[entityIndex].attributes || [])];
      const newValidations = [...(newAttrs[attrIndex].validations || [])];
      newValidations[vIdx] = value;
      newAttrs[attrIndex] = { ...newAttrs[attrIndex], validations: newValidations };
      newEntities[entityIndex] = { ...newEntities[entityIndex], attributes: newAttrs };
      return { ...prev, entities: newEntities };
    });
  };

  const removeValidation = (entityIndex: number, attrIndex: number, vIdx: number) => {
    setSchema(prev => {
      const newEntities = [...prev.entities];
      const newAttrs = [...(newEntities[entityIndex].attributes || [])];
      newAttrs[attrIndex] = {
        ...newAttrs[attrIndex],
        validations: (newAttrs[attrIndex].validations || []).filter((_, i) => i !== vIdx)
      };
      newEntities[entityIndex] = { ...newEntities[entityIndex], attributes: newAttrs };
      return { ...prev, entities: newEntities };
    });
  };

  const addRelationship = (entityIndex: number) => {
    const newRel: Relationship = {
      type: "one-to-many",
      target_entity: "",
      foreign_key: ""
    };
    setSchema(prev => {
      const newEntities = [...prev.entities];
      newEntities[entityIndex] = {
        ...newEntities[entityIndex],
        relationships: [...(newEntities[entityIndex].relationships || []), newRel]
      };
      return { ...prev, entities: newEntities };
    });
  };

  const updateRelationship = (entityIndex: number, relIndex: number, value: Partial<Relationship>) => {
    setSchema(prev => {
      const newEntities = [...prev.entities];
      const newRels = [...(newEntities[entityIndex].relationships || [])];
      newRels[relIndex] = { ...newRels[relIndex], ...value };
      newEntities[entityIndex] = {
        ...newEntities[entityIndex],
        relationships: newRels
      };
      return { ...prev, entities: newEntities };
    });
  };

  const removeRelationship = (entityIndex: number, relIndex: number) => {
    setSchema(prev => {
      const newEntities = [...prev.entities];
      newEntities[entityIndex] = {
        ...newEntities[entityIndex],
        relationships: (newEntities[entityIndex].relationships || []).filter((_, i) => i !== relIndex)
      };
      return { ...prev, entities: newEntities };
    });
  };

  const addService = () => {
    const newService: Service = {
      name: "NewService",
      target_entity: "",
      description: "",
      operations: [
        { name: 'create', type: 'create', criteria: '', selected_attributes: [], description: '' },
        { name: 'viewAll', type: 'viewAll', criteria: '', selected_attributes: [], description: '' },
        { name: 'viewBy', type: 'viewBy', criteria: 'id', selected_attributes: [], description: '' },
        { name: 'updateBy', type: 'updateBy', criteria: 'id', selected_attributes: [], description: '' },
        { name: 'delete', type: 'delete', criteria: 'id', selected_attributes: [], isSoftDelete: false, description: '' }
      ]
    };
    setSchema(prev => ({ ...prev, services: [...(prev.services || []), newService] }));
  };

  const updateService = (index: number, value: Partial<Service>) => {
    setSchema(prev => {
      const newServices = [...(prev.services || [])];
      let current = { ...newServices[index], ...value };
      
      if (value.target_entity !== undefined && value.target_entity !== newServices[index].target_entity) {
        const entityName = value.target_entity;
        if (entityName) {
          current.name = `${entityName}Service`;
          current.operations = (current.operations || []).map(op => ({
            ...op,
            name: generateOpName(op.type, entityName, op.criteria)
          }));
        }
      }
      
      newServices[index] = current;
      return { ...prev, services: newServices };
    });
  };

  const removeService = (index: number) => {
    setSchema(prev => ({ ...prev, services: (prev.services || []).filter((_, i) => i !== index) }));
  };

  const addOperation = (sIdx: number) => {
    setSchema(prev => {
      const newServices = [...(prev.services || [])];
      const service = newServices[sIdx];
      const newOp: ServiceOperation = {
        name: generateOpName('custom', service.target_entity),
        type: "custom",
        criteria: "",
        selected_attributes: [],
        description: ""
      };
      newServices[sIdx] = { ...service, operations: [...(service.operations || []), newOp] };
      return { ...prev, services: newServices };
    });
  };

  const updateOperation = (sIdx: number, opIdx: number, value: Partial<ServiceOperation>) => {
    setSchema(prev => {
      const newServices = [...(prev.services || [])];
      const service = newServices[sIdx];
      const newOps = [...(service.operations || [])];
      let currentOp = { ...newOps[opIdx], ...value };
      
      if (value.type !== undefined || value.criteria !== undefined) {
        currentOp.name = generateOpName(currentOp.type, service.target_entity, currentOp.criteria);
      }
      
      newOps[opIdx] = currentOp;
      newServices[sIdx] = { ...service, operations: newOps };
      return { ...prev, services: newServices };
    });
  };

  const removeOperation = (sIdx: number, opIdx: number) => {
    setSchema(prev => {
      const newServices = [...(prev.services || [])];
      newServices[sIdx] = {
        ...newServices[sIdx],
        operations: (newServices[sIdx].operations || []).filter((_, i) => i !== opIdx)
      };
      return { ...prev, services: newServices };
    });
  };

  const addOpAttribute = (sIdx: number, opIdx: number) => {
    setSchema(prev => {
      const newServices = [...(prev.services || [])];
      const newOps = [...(newServices[sIdx].operations || [])];
      newOps[opIdx] = {
        ...newOps[opIdx],
        selected_attributes: [...(newOps[opIdx].selected_attributes || []), ""]
      };
      newServices[sIdx] = { ...newServices[sIdx], operations: newOps };
      return { ...prev, services: newServices };
    });
  };

  const updateOpAttribute = (sIdx: number, opIdx: number, aIdx: number, value: string) => {
    setSchema(prev => {
      const newServices = [...(prev.services || [])];
      const newOps = [...(newServices[sIdx].operations || [])];
      const newAttrs = [...(newOps[opIdx].selected_attributes || [])];
      newAttrs[aIdx] = value;
      newOps[opIdx] = { ...newOps[opIdx], selected_attributes: newAttrs };
      newServices[sIdx] = { ...newServices[sIdx], operations: newOps };
      return { ...prev, services: newServices };
    });
  };

  const removeOpAttribute = (sIdx: number, opIdx: number, aIdx: number) => {
    setSchema(prev => {
      const newServices = [...(prev.services || [])];
      const newOps = [...(newServices[sIdx].operations || [])];
      newOps[opIdx] = {
        ...newOps[opIdx],
        selected_attributes: (newOps[opIdx].selected_attributes || []).filter((_, i) => i !== aIdx)
      };
      newServices[sIdx] = { ...newServices[sIdx], operations: newOps };
      return { ...prev, services: newServices };
    });
  };

  const syncDTOs = () => {
    setSchema(prev => {
      const newDTOs: DTO[] = [];
      (prev.services || []).forEach(service => {
        const entity = prev.entities.find(e => e.name === service.target_entity);
        if (!entity) return;

        (service.operations || []).forEach(op => {
          if (!op.enabled && op.type === 'delete') return;

          let dtoName = "";
          let fields: DTOField[] = [];
          
          const entityFields = (entity.attributes || []).map(a => ({
            name: a.field_name,
            type: a.data_type,
            required: a.constraints.required
          }));

          switch (op.type) {
            case 'create':
              dtoName = `Create${entity.name}Request`;
              fields = entityFields.filter(f => f.name.toLowerCase() !== 'id');
              break;
            case 'viewAll':
            case 'viewBy':
              dtoName = `${entity.name}Response`;
              fields = entityFields;
              break;
            case 'updateBy':
              dtoName = `Update${entity.name}Request`;
              fields = entityFields.map(f => ({ ...f, required: false }));
              break;
            case 'custom':
              dtoName = `${op.name.charAt(0).toUpperCase() + op.name.slice(1)}DTO`;
              fields = entityFields.filter(f => op.selected_attributes.includes(f.name));
              break;
          }

          if (dtoName && !newDTOs.find(d => d.name === dtoName)) {
            newDTOs.push({
              name: dtoName,
              base_entity: entity.name,
              fields,
              description: `Generated DTO for ${op.name}`
            });
          }
        });
      });
      return { ...prev, dtos: newDTOs };
    });
  };

  const updateDTO = (index: number, value: Partial<DTO>) => {
    setSchema(prev => {
      const newDTOs = [...(prev.dtos || [])];
      newDTOs[index] = { ...newDTOs[index], ...value };
      return { ...prev, dtos: newDTOs };
    });
  };

  const removeDTO = (index: number) => {
    setSchema(prev => ({ ...prev, dtos: (prev.dtos || []).filter((_, i) => i !== index) }));
  };

  const addDTOField = (dIdx: number) => {
    setSchema(prev => {
      const newDTOs = [...(prev.dtos || [])];
      const dto = newDTOs[dIdx];
      const newField: DTOField = { name: "", type: "String", required: true };
      newDTOs[dIdx] = { ...dto, fields: [...(dto.fields || []), newField] };
      return { ...prev, dtos: newDTOs };
    });
  };

  const updateDTOField = (dIdx: number, fIdx: number, value: Partial<DTOField>) => {
    setSchema(prev => {
      const newDTOs = [...(prev.dtos || [])];
      const dto = newDTOs[dIdx];
      const newFields = [...(dto.fields || [])];
      newFields[fIdx] = { ...newFields[fIdx], ...value };
      newDTOs[dIdx] = { ...dto, fields: newFields };
      return { ...prev, dtos: newDTOs };
    });
  };

  const removeDTOField = (dIdx: number, fIdx: number) => {
    setSchema(prev => {
      const newDTOs = [...(prev.dtos || [])];
      const dto = newDTOs[dIdx];
      newDTOs[dIdx] = { ...dto, fields: (dto.fields || []).filter((_, i) => i !== fIdx) };
      return { ...prev, dtos: newDTOs };
    });
  };

  const jsonString = useMemo(() => JSON.stringify(schema, null, 2), [schema]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString);
    alert("Copied to clipboard!");
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Project Schema Drafter</h1>
        <div className="actions">
          <button className="btn-secondary" onClick={copyToClipboard}>Copy JSON</button>
          <button className="btn-primary" onClick={() => console.log(schema)}>Save Project</button>
        </div>
      </header>

      <main className="main-content">
        <section className="editor">
          <div className="card">
            <h2>Project Metadata</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Project Name</label>
                <input 
                  type="text" 
                  value={schema.project_metadata.name} 
                  onChange={e => updateMetadata('name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Version</label>
                <input 
                  type="text" 
                  value={schema.project_metadata.version} 
                  onChange={e => updateMetadata('version', e.target.value)}
                />
              </div>
              <div className="form-group full-width">
                <label>Description</label>
                <textarea 
                  value={schema.project_metadata.description} 
                  onChange={e => updateMetadata('description', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Frontend</label>
                <input 
                  type="text" 
                  value={schema.project_metadata.stack.frontend} 
                  onChange={e => updateMetadata('stack', { frontend: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Backend</label>
                <input 
                  type="text" 
                  value={schema.project_metadata.stack.backend} 
                  onChange={e => updateMetadata('stack', { backend: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Database</label>
                <input 
                  type="text" 
                  value={schema.project_metadata.stack.database} 
                  onChange={e => updateMetadata('stack', { database: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="section-header">
            <h2>Entities</h2>
            <button className="btn-add" onClick={addEntity}>+ Add Entity</button>
          </div>

          {(schema.entities || []).map((entity, eIdx) => (
            <div key={eIdx} className="card entity-card">
              <div className="card-header">
                <input 
                  className="h3-input"
                  value={entity.name} 
                  onChange={e => updateEntity(eIdx, { name: e.target.value })}
                />
                <button className="btn-delete" onClick={() => removeEntity(eIdx)}>Remove</button>
              </div>
              <div className="form-group">
                <label>Entity Description</label>
                <input 
                  type="text" 
                  value={entity.description} 
                  onChange={e => updateEntity(eIdx, { description: e.target.value })}
                />
              </div>

              <div className="sub-section">
                <div className="section-header">
                  <h4>Attributes</h4>
                  <button className="btn-small" onClick={() => addAttribute(eIdx)}>+ Add Field</button>
                </div>
                {(entity.attributes || []).map((attr, aIdx) => (
                  <div key={aIdx} className="attribute-container">
                    <div className="attribute-row">
                      <input 
                        placeholder="Field Name"
                        value={attr.field_name} 
                        onChange={e => updateAttribute(eIdx, aIdx, { field_name: e.target.value })}
                      />
                      <select 
                        value={attr.data_type} 
                        onChange={e => updateAttribute(eIdx, aIdx, { data_type: e.target.value })}
                      >
                        <optgroup label="Common">
                          <option value="String (VARCHAR)">String (VARCHAR)</option>
                          <option value="Integer (INT)">Integer (INT)</option>
                          <option value="Long (BIGINT)">Long (BIGINT)</option>
                          <option value="Boolean (BIT)">Boolean (BIT)</option>
                        </optgroup>
                        <optgroup label="Numeric">
                          <option value="Double (FLOAT)">Double (FLOAT)</option>
                          <option value="BigDecimal (DECIMAL)">BigDecimal (DECIMAL)</option>
                        </optgroup>
                        <optgroup label="Date/Time">
                          <option value="Date (DATE)">Date (DATE)</option>
                          <option value="Timestamp (DATETIME)">Timestamp (DATETIME)</option>
                        </optgroup>
                        <optgroup label="Special">
                          <option value="UUID">UUID</option>
                          <option value="Text (CLOB)">Text (CLOB)</option>
                          <option value="ByteArray (BLOB)">ByteArray (BLOB)</option>
                        </optgroup>
                      </select>
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={attr.constraints.required} 
                          onChange={e => updateAttribute(eIdx, aIdx, { constraints: { ...attr.constraints, required: e.target.checked } })}
                        /> Required
                      </label>
                      <button className="btn-icon-delete" onClick={() => removeAttribute(eIdx, aIdx)}>×</button>
                    </div>
                    <div className="validation-section">
                      <div className="validation-header">
                        <span className="validation-icon">🛡️ Validation Rules</span>
                        <button className="btn-small btn-ghost" onClick={() => addValidation(eIdx, aIdx)}>+ Add Rule</button>
                      </div>
                      {(attr.validations || []).map((v, vIdx) => (
                        <div key={vIdx} className="validation-box">
                          <input 
                            className="validation-input"
                            placeholder="e.g., 'Must be 10 digits', 'Unique corporate email'..."
                            value={v}
                            onChange={e => updateValidation(eIdx, aIdx, vIdx, e.target.value)}
                          />
                          <button className="btn-icon-delete small-icon" onClick={() => removeValidation(eIdx, aIdx, vIdx)}>×</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="sub-section">
                <div className="section-header">
                  <h4>Relationships</h4>
                  <button className="btn-small" onClick={() => addRelationship(eIdx)}>+ Add Relation</button>
                </div>
                {(entity.relationships || []).map((rel, rIdx) => (
                  <div key={rIdx} className="attribute-row relationship-row">
                    <select 
                      value={rel.type} 
                      onChange={e => updateRelationship(eIdx, rIdx, { type: e.target.value })}
                    >
                      <option value="one-to-one">One-to-One</option>
                      <option value="one-to-many">One-to-Many</option>
                      <option value="many-to-one">Many-to-One</option>
                      <option value="many-to-many">Many-to-Many</option>
                    </select>
                    <select 
                      value={rel.target_entity} 
                      onChange={e => updateRelationship(eIdx, rIdx, { target_entity: e.target.value, foreign_key: "" })}
                    >
                      <option value="">Select Target Entity...</option>
                      {schema.entities
                        .filter(e => e.name !== entity.name)
                        .map((e, idx) => (
                          <option key={idx} value={e.name}>{e.name}</option>
                        ))}
                    </select>
                    <select 
                      value={rel.foreign_key} 
                      onChange={e => updateRelationship(eIdx, rIdx, { foreign_key: e.target.value })}
                      disabled={!rel.target_entity}
                    >
                      <option value="">Select Foreign Key...</option>
                      {(schema.entities.find(e => e.name === rel.target_entity)?.attributes || []).map((attr, idx) => (
                        <option key={idx} value={attr.field_name}>{attr.field_name || `Field ${idx + 1}`}</option>
                      ))}
                    </select>
                    <button className="btn-icon-delete" onClick={() => removeRelationship(eIdx, rIdx)}>×</button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="section-header">
            <h2>Services (Resource APIs)</h2>
            <button className="btn-add" onClick={addService}>+ Add Resource</button>
          </div>

          {(schema.services || []).map((service, sIdx) => (
            <div key={sIdx} className="card">
              <div className="card-header">
                <div className="service-name-group">
                  <input 
                    className="h3-input"
                    placeholder="Service Name (e.g., UserService)"
                    value={service.name} 
                    onChange={e => updateService(sIdx, { name: e.target.value })}
                  />
                  <span className="auto-badge">AUTO</span>
                </div>
                <button className="btn-delete" onClick={() => removeService(sIdx)}>Remove</button>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Associated Entity</label>
                  <select 
                    value={service.target_entity} 
                    onChange={e => updateService(sIdx, { target_entity: e.target.value })}
                  >
                    <option value="">Select Entity...</option>
                    {schema.entities.map((e, idx) => (
                      <option key={idx} value={e.name}>{e.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input 
                    type="text" 
                    placeholder="Resource description..."
                    value={service.description} 
                    onChange={e => updateService(sIdx, { description: e.target.value })}
                  />
                </div>
                
                <div className="form-group full-width">
                  <div className="sub-section">
                    <div className="section-header">
                      <h4>CRUD Functions</h4>
                      <button className="btn-small btn-ghost" onClick={() => addOperation(sIdx)}>+ Add Operation</button>
                    </div>
                    <div className="operations-list">
                      {(service.operations || []).map((op, opIdx) => (
                        <div key={opIdx} className="operation-card todo-item">
                          <div className="operation-main-row">
                            <div className="op-name-wrapper">
                              <input 
                                className="op-name-input"
                                value={op.name}
                                onChange={e => updateOperation(sIdx, opIdx, { name: e.target.value })}
                                placeholder="Function name..."
                              />
                            </div>
                            <select 
                              value={op.type}
                              onChange={e => updateOperation(sIdx, opIdx, { type: e.target.value as any })}
                              className="op-type-select"
                            >
                              <option value="create">CREATE</option>
                              <option value="viewAll">VIEWALL</option>
                              <option value="viewBy">VIEWBY</option>
                              <option value="updateBy">UPDATEBY</option>
                              <option value="delete">DELETE</option>
                              <option value="custom">CUSTOM</option>
                            </select>
                            
                            {(op.type === 'viewBy' || op.type === 'updateBy' || op.type === 'delete') && (
                              <div className="op-criteria">
                                <label>By:</label>
                                <select 
                                  value={op.criteria}
                                  onChange={e => updateOperation(sIdx, opIdx, { criteria: e.target.value })}
                                >
                                  <option value="">Select Field...</option>
                                  {(schema.entities.find(e => e.name === service.target_entity)?.attributes || []).map((attr, idx) => (
                                    <option key={idx} value={attr.field_name}>{attr.field_name}</option>
                                  ))}
                                </select>
                              </div>
                            )}
                            
                            {op.type === 'delete' && (
                              <label className="checkbox-label soft-delete">
                                <input 
                                  type="checkbox" 
                                  checked={op.isSoftDelete}
                                  onChange={e => updateOperation(sIdx, opIdx, { isSoftDelete: e.target.checked })}
                                />
                                Soft
                              </label>
                            )}
                            
                            <button className="btn-icon-delete" onClick={() => removeOperation(sIdx, opIdx)}>×</button>
                          </div>
                          
                          <div className="operation-details-row">
                            <input 
                              className="op-desc-input"
                              placeholder="Add operation description..."
                              value={op.description}
                              onChange={e => updateOperation(sIdx, opIdx, { description: e.target.value })}
                            />
                          </div>

                          {op.type === 'custom' && (
                            <div className="custom-attributes-section">
                              <div className="validation-header">
                                <span className="mini-label">Involved Attributes:</span>
                                <button className="btn-tiny" onClick={() => addOpAttribute(sIdx, opIdx)}>+ Add Attr</button>
                              </div>
                              <div className="op-attr-list">
                                {(op.selected_attributes || []).map((selectedAttr, attrIdx) => (
                                  <div key={attrIdx} className="op-attr-row">
                                    <select 
                                      value={selectedAttr}
                                      onChange={e => updateOpAttribute(sIdx, opIdx, attrIdx, e.target.value)}
                                    >
                                      <option value="">Select Attr...</option>
                                      {(schema.entities.find(e => e.name === service.target_entity)?.attributes || []).map((attr, idx) => (
                                        <option key={idx} value={attr.field_name}>{attr.field_name}</option>
                                      ))}
                                    </select>
                                    <button className="btn-icon-delete tiny-icon" onClick={() => removeOpAttribute(sIdx, opIdx, attrIdx)}>×</button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="section-header">
            <h2>DTO Templates</h2>
            <button className="btn-add btn-sync" onClick={syncDTOs}>🔄 Sync from Services</button>
          </div>

          <div className="dto-grid">
            {(schema.dtos || []).map((dto, dIdx) => (
              <div key={dIdx} className="card dto-card">
                <div className="card-header">
                  <div className="service-name-group">
                    <input 
                      className="h3-input"
                      value={dto.name} 
                      onChange={e => updateDTO(dIdx, { name: e.target.value })}
                    />
                  </div>
                  <button className="btn-delete" onClick={() => removeDTO(dIdx)}>Remove</button>
                </div>
                <div className="dto-controls">
                  <p className="dto-meta">Base Entity: <strong>{dto.base_entity}</strong></p>
                  <button className="btn-tiny btn-ghost" onClick={() => addDTOField(dIdx)}>+ Add Field</button>
                </div>
                <div className="dto-fields-editor">
                  {(dto.fields || []).map((field, fIdx) => (
                    <div key={fIdx} className="dto-field-edit-row">
                      <select 
                        value={field.name}
                        onChange={e => {
                          const attr = schema.entities.find(ent => ent.name === dto.base_entity)?.attributes.find(a => a.field_name === e.target.value);
                          updateDTOField(dIdx, fIdx, { name: e.target.value, type: attr?.data_type || field.type });
                        }}
                        className="dto-field-select"
                      >
                        <option value="">Select Attribute...</option>
                        {(schema.entities.find(e => e.name === dto.base_entity)?.attributes || []).map((attr, idx) => (
                          <option key={idx} value={attr.field_name}>{attr.field_name}</option>
                        ))}
                      </select>
                      <span className="dto-field-type-tag">{field.type}</span>
                      <label className="checkbox-label mini-check">
                        <input 
                          type="checkbox" 
                          checked={field.required}
                          onChange={e => updateDTOField(dIdx, fIdx, { required: e.target.checked })}
                        />
                        Req
                      </label>
                      <button className="btn-icon-delete small-icon" onClick={() => removeDTOField(dIdx, fIdx)}>×</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <h2>Global Settings</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Auth Provider</label>
                <select 
                  value={schema.global_settings.auth_provider} 
                  onChange={e => setSchema(prev => ({ ...prev, global_settings: { ...prev.global_settings, auth_provider: e.target.value } }))}
                >
                  <option value="none">None</option>
                  <option value="jwt">JWT</option>
                  <option value="oauth2">OAuth2</option>
                  <option value="firebase">Firebase</option>
                </select>
              </div>
              <div className="form-group">
                <label>Theme</label>
                <select 
                  value={schema.global_settings.theme} 
                  onChange={e => setSchema(prev => ({ ...prev, global_settings: { ...prev.global_settings, theme: e.target.value as 'light' | 'dark' } }))}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <aside className="preview">
          <div className="preview-sticky">
            <h3>JSON Preview</h3>
            <pre>{jsonString}</pre>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
