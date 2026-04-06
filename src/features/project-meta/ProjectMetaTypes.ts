export interface ProjectMetadata {
  name: string;
  description: string;
  version: string;
  stack: {
    pattern: string;
    architecture: string;
    framework: string;
    language: string;
    database: string;
  };
}