import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {/* Original 4 nodes */}
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />

                {/* 5 new nodes */}
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='timer' label='Timer' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='logger' label='Logger' />
            </div>
        </div>
    );
};
