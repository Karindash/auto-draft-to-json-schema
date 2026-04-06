import React from 'react';
import './App.css';
import { SchemaProvider, useSchemaStore } from './global/store/SchemaContext';
import { ProjectMetaEditor } from './features/project-meta/ProjectMetaEditor';
import { ResourceList } from './features/resources/ResourceList';
import { ServiceList } from './features/services/ServiceList';
import { EndpointTable } from './features/output-viewer/EndpointTable';
import { Header } from './components/organisms/Header';
import { JSONTerminal } from './features/output-viewer/JSONTerminal';
import { Button } from './components/atoms/Button';
import { Title } from './components/atoms/Title';

const AppContent: React.FC = () => {
  const { currentLayer, actions, error } = useSchemaStore();

  if (error) {
    return <div className="error-screen"><Title level={1}>Error</Title><pre>{error}</pre></div>;
  }

  const layers = [
    { title: "Layer 0: Project", component: <ProjectMetaEditor /> },
    { title: "Layer 1: Resources", component: <ResourceList /> },
    { title: "Layer 2: Business Process", component: <ServiceList /> },
    { title: "Layer 3: Product Rules", component: <EndpointTable /> }
  ];

  return (
    <div className="container">
      <Header />

      <nav className="layer-stepper">
        {layers.map((l, i) => (
          <div 
            key={i} 
            className={`step ${currentLayer === i ? 'active' : ''} ${currentLayer > i ? 'completed' : ''}`}
            onClick={() => actions.setLayer(i)}
          >
            <span className="step-number">{i}</span>
            <span className="step-title">{l.title.split(': ')[1]}</span>
          </div>
        ))}
      </nav>

      <main className="main-content">
        <section className="editor-side">
          {layers[currentLayer].component}
          
          <div className="layer-navigation">
            <Button 
              variant="neutral" 
              onClick={actions.prevLayer}
              disabled={currentLayer === 0}
            >
              Back
            </Button>
            <Button 
              variant="neutral"
              className="primary-action" 
              onClick={actions.nextLayer}
              disabled={currentLayer === layers.length - 1}
            >
              Next
            </Button>
          </div>
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
