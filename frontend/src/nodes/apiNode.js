import { useState } from 'react';
import { BaseNode } from './baseNode';

export const ApiNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  return (
    <BaseNode
      id={id}
      title="API Request"
      inputs={[
        { id: 'url', label: 'URL' },
        { id: 'body', label: 'Body' },
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
    >
      <label className="node-field">
        <span>Method</span>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
      <label className="node-field">
        <span>URL</span>
        <input
          type="text"
          placeholder="https://api.example.com/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
