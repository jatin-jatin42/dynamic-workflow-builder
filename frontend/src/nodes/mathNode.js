import { useState } from 'react';
import { BaseNode } from './baseNode';

const OPERATIONS = [
  { value: 'add',      label: 'Add  (A + B)' },
  { value: 'subtract', label: 'Subtract  (A − B)' },
  { value: 'multiply', label: 'Multiply  (A × B)' },
  { value: 'divide',   label: 'Divide  (A ÷ B)' },
  { value: 'mod',      label: 'Modulo  (A % B)' },
  { value: 'power',    label: 'Power  (A ^ B)' },
];

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  return (
    <BaseNode
      id={id}
      title="Math"
      inputs={[
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' },
      ]}
      outputs={[{ id: 'result', label: 'Result' }]}
    >
      <label className="node-field">
        <span>Operation</span>
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          {OPERATIONS.map((op) => (
            <option key={op.value} value={op.value}>{op.label}</option>
          ))}
        </select>
      </label>
    </BaseNode>
  );
};
