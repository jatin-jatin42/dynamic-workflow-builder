import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={[
        { id: 'system', label: 'System' },
        { id: 'prompt', label: 'Prompt' },
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
    >
      <p className="node-description">Large Language Model</p>
    </BaseNode>
  );
};
