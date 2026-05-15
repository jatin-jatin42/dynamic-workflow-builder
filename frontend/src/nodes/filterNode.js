import { useState } from 'react';
import { BaseNode } from './baseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      inputs={[{ id: 'data', label: 'Data' }]}
      outputs={[
        { id: 'pass', label: 'Pass' },
        { id: 'fail', label: 'Fail' },
      ]}
    >
      <label className="node-field">
        <span>Condition</span>
        <input
          type="text"
          placeholder="e.g. value > 10"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
