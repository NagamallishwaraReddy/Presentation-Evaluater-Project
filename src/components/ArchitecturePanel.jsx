// Architecture Panel Component for Project Presentation Evaluator Defence
const { useState } = React;

export default function ArchitecturePanel({ codeSnippets, workflowSteps }) {
  const [activeSnippet, setActiveSnippet] = useState('extractText');
  const [copied, setCopied] = useState(false);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fadeIn">
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-lg font-extrabold shadow-md shadow-indigo-500/30">
              4
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-100 uppercase tracking-wide">
                AI Evaluation Module (Member 4 Specs)
              </h2>
              <p className="text-xs text-indigo-300">
                System design, pipeline architecture, and frontend/backend code implementations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-300">DIFFICULTY:</span>
            <div className="flex text-amber-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fa-solid fa-star"></i>
              ))}
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Very Hard
            </span>
          </div>
        </div>

        {/* Member Responsibilities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-200">
            <i className="fa-solid fa-circle-check text-indigo-400"></i>
            <span>Extract text from slides</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <i className="fa-solid fa-circle-check text-indigo-400"></i>
            <span>Speech-to-text conversion</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <i className="fa-solid fa-circle-check text-indigo-400"></i>
            <span>Analyze grammar & flow</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <i className="fa-solid fa-circle-check text-indigo-400"></i>
            <span>Evaluate pronunciation</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <i className="fa-solid fa-circle-check text-indigo-400"></i>
            <span>Generate radar scores</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <i className="fa-solid fa-circle-check text-indigo-400"></i>
            <span>Provide AI feedback</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <i className="fa-solid fa-circle-check text-indigo-400"></i>
            <span>Detect filler words</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <i className="fa-solid fa-circle-check text-indigo-400"></i>
            <span>Confidence analysis</span>
          </div>
        </div>
      </div>

      {/* Step-by-Step Implementation Cards (1 to 7) */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <i className="fa-solid fa-list-check text-indigo-400"></i>
          HOW TO CREATE THIS MODULE (STEP-BY-STEP)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflowSteps.map((ws) => (
            <div key={ws.step} className="glass-card p-4 rounded-xl space-y-2 border-slate-800 hover:border-indigo-500/40 transition-all">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {ws.step}
                </span>
                <h4 className="text-xs font-bold text-slate-100 truncate">{ws.title}</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{ws.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Code Snippets Viewer */}
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <i className="fa-solid fa-code text-indigo-400"></i>
            Module Implementation Code Snippets
          </h3>

          {/* Snippet Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveSnippet('extractText')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeSnippet === 'extractText' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Slide Text OCR
            </button>
            <button
              onClick={() => setActiveSnippet('whisperAPI')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeSnippet === 'whisperAPI' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Whisper API
            </button>
            <button
              onClick={() => setActiveSnippet('aiAnalysis')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeSnippet === 'aiAnalysis' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3. LLM AI Prompt
            </button>
            <button
              onClick={() => setActiveSnippet('saveResult')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeSnippet === 'saveResult' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              4. Express API
            </button>
          </div>
        </div>

        {/* Code View Box */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-indigo-200 leading-relaxed">
          <button
            onClick={() => handleCopy(codeSnippets[activeSnippet])}
            className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-sans font-semibold transition-colors flex items-center gap-1.5"
          >
            <i className={`fa-solid ${copied ? 'fa-check text-emerald-400' : 'fa-copy'}`}></i>
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
          <pre className="overflow-x-auto whitespace-pre-wrap">{codeSnippets[activeSnippet]}</pre>
        </div>
      </div>

      {/* Data Flow & Tech Stack Badges */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Data Flow Diagram Card (7 cols) */}
        <div className="md:col-span-7 glass-card p-5 rounded-2xl space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">DATA FLOW DIAGRAM</h4>
          <div className="flex items-center justify-between gap-1 overflow-x-auto py-2 text-center">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 min-w-[70px]">
              <i className="fa-solid fa-cloud-arrow-up text-indigo-400 text-sm mb-1 block"></i>
              <span className="text-[10px] text-slate-300 font-semibold block">User Upload</span>
            </div>
            <i className="fa-solid fa-arrow-right text-slate-600 text-xs"></i>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 min-w-[70px]">
              <i className="fa-solid fa-file-text text-emerald-400 text-sm mb-1 block"></i>
              <span className="text-[10px] text-slate-300 font-semibold block">Extract Text</span>
            </div>
            <i className="fa-solid fa-arrow-right text-slate-600 text-xs"></i>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 min-w-[70px]">
              <i className="fa-solid fa-waveform text-purple-400 text-sm mb-1 block"></i>
              <span className="text-[10px] text-slate-300 font-semibold block">Speech-to-Text</span>
            </div>
            <i className="fa-solid fa-arrow-right text-slate-600 text-xs"></i>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 min-w-[70px]">
              <i className="fa-solid fa-brain text-amber-400 text-sm mb-1 block"></i>
              <span className="text-[10px] text-slate-300 font-semibold block">AI Analysis</span>
            </div>
            <i className="fa-solid fa-arrow-right text-slate-600 text-xs"></i>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 min-w-[70px]">
              <i className="fa-solid fa-chart-line text-blue-400 text-sm mb-1 block"></i>
              <span className="text-[10px] text-slate-300 font-semibold block">Scores & Save</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Card (5 cols) */}
        <div className="md:col-span-5 glass-card p-5 rounded-2xl space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">TECH STACK USED</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
              <i className="fa-brands fa-react mr-1.5"></i>React.js
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
              Tailwind CSS
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              OpenAI / Gemini API
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold">
              Whisper API
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <i className="fa-brands fa-node-js mr-1.5"></i>Express.js Backend
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
