import { Handle, Position } from 'reactflow';

const handleTop = (index, total) => `${((index + 1) / (total + 1)) * 100}%`;

export const BaseNode = ({ id, title, inputs = [], outputs = [], children }) => (
  <div className="base-node min-w-[220px] bg-slate-800 border border-slate-700 rounded-xl
                  shadow-[0_4px_24px_rgba(0,0,0,0.55)] overflow-hidden
                  transition-all duration-150 hover:border-indigo-500/40">
    {inputs.map((handle, i) => {
      const topPos = handleTop(i, inputs.length);
      return (
        <div key={handle.id}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${handle.id}`}
            style={{ top: topPos }}
          />
          <span 
            className="absolute text-[10px] font-medium text-slate-300 pointer-events-none whitespace-nowrap"
            style={{ 
              top: topPos, 
              left: '-8px',
              transform: 'translate(-100%, -50%)' 
            }}
          >
            {handle.label}
          </span>
        </div>
      );
    })}

    <div className="flex items-center px-3 py-2 bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 border-b border-slate-700">
      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-indigo-400">
        {title}
      </span>
    </div>

    <div className="p-3 flex flex-col gap-2">
      {children}
    </div>

    {outputs.map((handle, i) => {
      const topPos = handleTop(i, outputs.length);
      return (
        <div key={handle.id}>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-${handle.id}`}
            style={{ top: topPos }}
          />
          <span 
            className="absolute text-[10px] font-medium text-slate-300 pointer-events-none whitespace-nowrap"
            style={{ 
              top: topPos, 
              right: '-8px',
              transform: 'translate(100%, -50%)' 
            }}
          >
            {handle.label}
          </span>
        </div>
      );
    })}
  </div>
);
