import { useState } from 'react';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  return (
    <BaseNode
      id={id}
      title="Text"
      outputs={[{ id: 'output', label: 'Output' }]}
    >
      <label className="node-field">
        <span>Text</span>
        <input
          type="text"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
