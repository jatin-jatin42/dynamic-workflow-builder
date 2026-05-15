import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => (
  <div className="flex items-center gap-4 px-5 h-[60px] bg-slate-900 border-b border-slate-700 flex-shrink-0">
    <div className="flex items-center gap-2 pr-5 border-r border-slate-700 flex-shrink-0">
      <span className="text-sm font-bold text-slate-100 tracking-tight whitespace-nowrap">
        ⚡ Pipeline Builder
      </span>
    </div>
    <div className="flex items-center flex-wrap gap-2 flex-1">
      <DraggableNode type='customInput' label='Input' />
      <DraggableNode type='llm' label='LLM' />
      <DraggableNode type='customOutput' label='Output' />
      <DraggableNode type='text' label='Text' />
      <DraggableNode type='filter' label='Filter' />
      <DraggableNode type='api' label='API' />
      <DraggableNode type='timer' label='Timer' />
      <DraggableNode type='math' label='Math' />
      <DraggableNode type='logger' label='Logger' />
    </div>
  </div>
);
