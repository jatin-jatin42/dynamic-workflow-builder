import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="border-t-glass flex items-center justify-center p-3 flex-shrink-0 z-10 relative">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full bg-gray-100/70 px-8 py-2.5 text-sm font-semibold text-black
                     transition-transform duration-200 hover:scale-[1.02] hover:bg-white/90
                     active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed gap-2"
          type="button"
        >
          {loading && (
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          Submit Pipeline
        </button>
      </div>

      {/* Result Modal */}
      {(result || error) && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/60 z-[1000]">
          <div className="glass-card rounded-xl shadow-2xl p-6 w-80 max-w-full flex flex-col gap-4 transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white mb-2">Pipeline Analysis</h3>
            
            {error ? (
              <div className="text-red-400 bg-red-400/10 p-3 rounded border border-red-400/20 text-sm">
                Error: {error}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                  <span className="text-slate-400 text-sm">Total Nodes:</span>
                  <span className="text-white font-bold">{result.num_nodes}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                  <span className="text-slate-400 text-sm">Total Edges:</span>
                  <span className="text-white font-bold">{result.num_edges}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-400 text-sm">Is DAG:</span>
                  <span className={`font-bold flex items-center gap-1 ${result.is_dag ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {result.is_dag ? '✅ True' : '❌ False'}
                  </span>
                </div>
              </div>
            )}
            
            <button
              onClick={() => { setResult(null); setError(null); }}
              className="mt-4 w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full font-medium
                         transition-all duration-200 ease-in-out active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
