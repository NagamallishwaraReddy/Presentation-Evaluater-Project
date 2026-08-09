// Sidebar Navigation Component
const { useState } = React;

export default function Sidebar({ activeView, setActiveView, onOpenUpload, onOpenArch }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-table-cells-large' },
    { id: 'upload', label: 'Upload Presentation', icon: 'fa-cloud-arrow-up', isAction: true },
    { id: 'evaluation', label: 'AI Evaluation', icon: 'fa-brain', badge: 'Active' },
    { id: 'feedback', label: 'AI Feedback', icon: 'fa-comment-dots' },
    { id: 'scoredetails', label: 'Score Details', icon: 'fa-chart-radar' },
    { id: 'presentations', label: 'My Presentations', icon: 'fa-folder-open' },
    { id: 'architecture', label: 'Module 4 Architecture', icon: 'fa-code', highlight: true }
  ];

  return (
    <aside className="w-64 bg-slate-900/90 border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <i className="fa-solid fa-chalkboard-user text-white text-lg"></i>
          </div>
          <div>
            <h1 className="font-extrabold text-slate-100 text-base leading-tight tracking-wide">
              Presentation<span className="text-indigo-400">Evaluator</span>
            </h1>
            <p className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">Module 4: AI Engine</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Navigation</div>
          
          {navItems.map((item) => {
            if (item.isAction) {
              return (
                <button
                  key={item.id}
                  onClick={onOpenUpload}
                  className="w-full my-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  <i className={`fa-solid ${item.icon}`}></i>
                  <span>Upload Slides / Audio</span>
                </button>
              );
            }

            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-inner'
                    : item.highlight
                    ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <i className={`fa-solid ${item.icon} text-base ${isActive ? 'text-indigo-400' : 'text-slate-400'}`}></i>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Member 4 Badge & Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-indigo-300">Member 4 Responsibility</span>
            <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-1.5 py-0.5 rounded">Evaluator API</span>
          </div>
          <p className="text-xs text-slate-400">Speech analysis, text extraction, filler word detection & score rendering.</p>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-indigo-400/30">
            M4
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">Software Eng. Team</p>
            <p className="text-[11px] text-slate-400 truncate">Module 4 Evaluator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
