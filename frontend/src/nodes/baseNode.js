import { Handle, Position } from 'reactflow';

/**
 * Distributes handles evenly across the node height.
 * For a single handle → 50%, for two → 33% and 67%, etc.
 */
const getHandleTop = (index, total) =>
  `${((index + 1) / (total + 1)) * 100}%`;

export const BaseNode = ({ id, title, inputs = [], outputs = [], children }) => {
  return (
    <div className="base-node">
      {inputs.map((handle, i) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          style={{ top: getHandleTop(i, inputs.length) }}
          title={handle.label}
        />
      ))}

      <div className="base-node__header">
        <span className="base-node__title">{title}</span>
      </div>

      <div className="base-node__body">
        {children}
      </div>

      {outputs.map((handle, i) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          style={{ top: getHandleTop(i, outputs.length) }}
          title={handle.label}
        />
      ))}
    </div>
  );
};
