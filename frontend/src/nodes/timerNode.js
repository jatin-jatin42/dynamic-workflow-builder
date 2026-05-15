import { useState } from 'react';
import { BaseNode } from './baseNode';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay ?? 1000);
  const [unit, setUnit] = useState(data?.unit || 'ms');

  return (
    <BaseNode
      id={id}
      title="Timer"
      inputs={[{ id: 'trigger', label: 'Trigger' }]}
      outputs={[{ id: 'output', label: 'Output' }]}
    >
      <label className="node-field">
        <span>Delay</span>
        <input
          type="number"
          min={0}
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
        />
      </label>
      <label className="node-field">
        <span>Unit</span>
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="ms">ms</option>
          <option value="s">s</option>
          <option value="m">min</option>
        </select>
      </label>
    </BaseNode>
  );
};
