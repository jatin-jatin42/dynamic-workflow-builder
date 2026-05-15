import { useMemo, useState, useRef, useEffect } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './baseNode';
 
const extractVariables = (text) =>
  [...new Set(
    [...text.matchAll(/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g)].map((m) => m[1])
  )];

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  const variables = useMemo(() => extractVariables(text), [text]);
  const inputs = variables.map((v) => ({ id: v, label: v }));

  useEffect(() => {
    updateNodeInternals(id);
  }, [variables.length, id, updateNodeInternals]);

  const handleResize = (target) => {
    target.style.height = 'auto';
    target.style.width = '180px';

    const optimalWidth = Math.max(180, Math.min(400, 180 + target.value.length * 0.7));
    target.style.width = `${optimalWidth}px`;
    
    target.style.height = `${target.scrollHeight}px`;
  };

  const handleChange = (e) => {
    setText(e.target.value);
    handleResize(e.target);
  };

  useEffect(() => {
    if (textareaRef.current) {
      handleResize(textareaRef.current);
    }
  }, []);

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={inputs}
      outputs={[{ id: 'output', label: 'Output' }]}
    >
      <label className="node-field">
        <span>Text</span>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          placeholder="Type text with {{ variables }}"
          className="nodrag nowheel px-2 py-1 bg-slate-950 border border-slate-700
                     rounded text-slate-200 text-xs outline-none
                     transition-shadow duration-150 resize-none overflow-hidden
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                     placeholder:text-slate-600"
          style={{
            minWidth: '180px',
            maxWidth: '400px',
            minHeight: '32px',
            boxSizing: 'border-box'
          }}
        />
      </label>
    </BaseNode>
  );
};
