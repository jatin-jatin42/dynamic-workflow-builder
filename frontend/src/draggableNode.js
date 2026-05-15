export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="glass-button group flex items-center justify-center px-3 min-w-[70px] h-[34px]
                 rounded-md cursor-grab select-none
                 transition-all duration-200 ease-in-out
                 hover:-translate-y-px hover:shadow-lg
                 active:cursor-grabbing active:scale-95"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <span className="text-xs font-medium text-slate-400 tracking-wide transition-colors duration-150 group-hover:text-indigo-400">
        {label}
      </span>
    </div>
  );
};