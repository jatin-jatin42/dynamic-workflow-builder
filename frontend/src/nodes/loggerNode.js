import { useState } from 'react';
import { BaseNode } from './baseNode';

export const LoggerNode = ({ id, data }) => {
  const [level, setLevel] = useState(data?.level || 'info');
  const [prefix, setPrefix] = useState(data?.prefix || '');

  return (
    <BaseNode
      id={id}
      title="Logger"
      inputs={[{ id: 'data', label: 'Data' }]}
      outputs={[{ id: 'passthrough', label: 'Passthrough' }]}
    >
      <label className="node-field">
        <span>Level</span>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="debug">Debug</option>
          <option value="info">Info</option>
          <option value="warn">Warn</option>
          <option value="error">Error</option>
        </select>
      </label>
      <label className="node-field">
        <span>Prefix</span>
        <input
          type="text"
          placeholder="[tag]"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
