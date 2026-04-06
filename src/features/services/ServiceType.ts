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
  target_resource: string;
  operations: ServiceOperation[];
  description: string;
}