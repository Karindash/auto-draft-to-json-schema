import React from 'react';
import './App.css';
import { SchemaProvider, useSchemaStore } from './core/store/SchemaContext';
import { ProjectMetaEditor } from './features/project-meta/components/ProjectMetaEditor';
import { EntityList } from './features/entities/components/EntityList';
import { ServiceList } from './features/services/components/ServiceList';
import { DTOList } from './features/dtos/components/DTOList';
import { EndpointTable } from './features/output-viewer/components/EndpointTable';
import { Header } from './shared/components/Header';
import { JSONTerminal } from './features/output-viewer/components/JSONTerminal';

const AppContent: React.FC = () => {
  const { error } = useSchemaStore();

  if (error) {
    return <div className="error-screen"><h1>Error</h1><pre>{error}</pre></div>;
  }

  return (
    <div className="container">
      <Header />

      <main className="main-content">
        <section className="editor-side">
          <ProjectMetaEditor />
          <EntityList />
          <ServiceList />
          <EndpointTable />
          <DTOList />
        </section>

        <JSONTerminal />
      </main>
    </div>
  );
};

function App() {
  return (
    <SchemaProvider>
      <AppContent />
    </SchemaProvider>
  );
}

export default App;
