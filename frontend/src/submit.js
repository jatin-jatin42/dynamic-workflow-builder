export const SubmitButton = () => (
  <div className="flex items-center justify-center p-3 bg-slate-900 border-t border-slate-700 flex-shrink-0">
    <button
      className="px-9 py-2.5 bg-indigo-500 text-white text-sm font-semibold rounded-md
                 tracking-wide cursor-pointer
                 transition-all duration-150
                 hover:bg-indigo-400 hover:-translate-y-px hover:shadow-[0_0_24px_rgba(99,102,241,0.32)]
                 active:scale-[0.97]
                 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed
                 disabled:shadow-none disabled:translate-y-0"
      type="submit"
    >
      Submit Pipeline
    </button>
  </div>
);
