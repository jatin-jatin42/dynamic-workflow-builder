import { Handle, Position } from 'reactflow';

// Evenly distributes handles: single → 50%, two → 33%/67%, etc.
const handleTop = (index, total) => `${((index + 1) / (total + 1)) * 100}%`;

export const BaseNode = ({ id, title, inputs = [], outputs = [], children }) => (
  <div className="base-node min-w-[220px] bg-slate-800 border border-slate-700 rounded-xl
                  shadow-[0_4px_24px_rgba(0,0,0,0.55)] overflow-hidden
                  transition-all duration-150 hover:border-indigo-500/40">
    {inputs.map((handle, i) => (
      <Handle
        key={handle.id}
        type="target"
        position={Position.Left}
        id={`${id}-${handle.id}`}
        style={{ top: handleTop(i, inputs.length) }}
        title={handle.label}
      />
    ))}

    <div className="flex items-center px-3 py-2 bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 border-b border-slate-700">
      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-indigo-400">
        {title}
      </span>
    </div>

    <div className="p-3 flex flex-col gap-2">
      {children}
    </div>

    {outputs.map((handle, i) => (
      <Handle
        key={handle.id}
        type="source"
        position={Position.Right}
        id={`${id}-${handle.id}`}
        style={{ top: handleTop(i, outputs.length) }}
        title={handle.label}
      />
    ))}
  </div>
);
