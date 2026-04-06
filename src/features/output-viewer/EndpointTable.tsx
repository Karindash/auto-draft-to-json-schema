import React from 'react';
import { useSchemaStore } from '../../global/store/SchemaContext';
import { Card } from '../../components/molecules/Card';

export const EndpointTable: React.FC = () => {
  const { schema } = useSchemaStore();
  const { services } = schema;

  const allEndpoints = (services || []).flatMap(s => 
    (s.operations || []).map(op => ({
      service: s.name,
      ...op
    }))
  );

  return (
    <Card title="API Endpoints" icon="🚀">
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Operation</th>
              <th>Method</th>
              <th>Path</th>
            </tr>
          </thead>
          <tbody>
            {allEndpoints.length > 0 ? allEndpoints.map((ep, i) => (
              <tr key={i}>
                <td>{ep.service}</td>
                <td>{ep.name}</td>
                <td><span className={`method-badge ${ep.http_method}`}>{ep.http_method}</span></td>
                <td><code>{ep.path}</code></td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>
                  No endpoints defined yet. Add services to see them here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
