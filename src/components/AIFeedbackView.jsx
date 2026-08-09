// Page 2: AI Feedback & Overall Scores Component
const { useState } = React;

export default function AIFeedbackView({ activePreset, onNavigateToDetails, onOpenReport }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'content', label: 'Content Feedback' },
    { id: 'delivery', label: 'Delivery Feedback' },
    { id: 'language', label: 'Language Feedback' },
    { id: 'suggestions', label: 'Suggestions' }
  ];

  const { overallScore, scoreStatus, starRating, scores, strengths, improvements } = activePreset;

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-600/30 text-purple-400 border border-purple-500/40 flex items-center justify-center text-sm">
              <i className="fa-solid fa-comment-dots"></i>
            </span>
            AI Feedback
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Here's your detailed AI feedback and suggestions compiled by the evaluation module.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToDetails}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            <span>View Score Details</span>
            <i className="fa-solid fa-chart-radar"></i>
          </button>

          <button
            onClick={onOpenReport}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-2"
          >
            <i className="fa-solid fa-download"></i>
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Category Tabs Header */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-inner'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Overall Score & Sub-scores (5 cols) */}
          <div className="lg:col-span-5 glass-card p-6 rounded-2xl flex flex-col justify-between space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Overall Score</span>
              
              {/* Score Gauge Circle */}
              <div className="relative w-36 h-36 mx-auto my-4 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="72" cy="72" r="54" className="stroke-slate-800" strokeWidth="10" fill="transparent" />
                  <circle
                    cx="72"
                    cy="72"
                    r="54"
                    className="stroke-indigo-500"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 54}
                    strokeDashoffset={(2 * Math.PI * 54) * (1 - overallScore / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-white">{overallScore}</span>
                  <span className="text-xs text-slate-400 font-semibold">/ 100</span>
                </div>
              </div>

              {/* Status Badge & Stars */}
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/30 mb-2">
                {scoreStatus}
              </div>
              <div className="flex items-center justify-center gap-1 text-amber-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fa-solid ${i < Math.floor(starRating) ? 'fa-star' : 'fa-star-half-stroke'}`}></i>
                ))}
              </div>
            </div>

            {/* Sub-score Badges Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-medium">Content</span>
                <p className="text-lg font-bold text-emerald-400 mt-0.5">{scores.content} <span className="text-xs text-slate-500">/ 100</span></p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-medium">Delivery</span>
                <p className="text-lg font-bold text-amber-400 mt-0.5">{scores.delivery} <span className="text-xs text-slate-500">/ 100</span></p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-medium">Language</span>
                <p className="text-lg font-bold text-indigo-400 mt-0.5">{scores.language} <span className="text-xs text-slate-500">/ 100</span></p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-medium">Confidence</span>
                <p className="text-lg font-bold text-purple-400 mt-0.5">{scores.confidence} <span className="text-xs text-slate-500">/ 100</span></p>
              </div>
            </div>
          </div>

          {/* Right Column: Strengths & Areas to Improve (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Strengths Card */}
            <div className="glass-card p-6 rounded-2xl border-emerald-500/20">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs font-bold">
                  <i className="fa-solid fa-circle-check"></i>
                </span>
                <h3 className="text-base font-bold text-slate-100">Strengths</h3>
              </div>

              <ul className="space-y-3">
                {strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-slate-200">
                    <i className="fa-solid fa-check text-emerald-400 mt-0.5 shrink-0"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas to Improve Card */}
            <div className="glass-card p-6 rounded-2xl border-rose-500/20">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-xs font-bold">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                </span>
                <h3 className="text-base font-bold text-slate-100">Areas to Improve</h3>
              </div>

              <ul className="space-y-3">
                {improvements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-slate-200">
                    <i className="fa-solid fa-xmark text-rose-400 mt-0.5 shrink-0"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab Specific Content Placeholders */}
      {activeTab !== 'overview' && (
        <div className="glass-card p-8 rounded-2xl text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 mx-auto flex items-center justify-center text-xl">
            <i className="fa-solid fa-magnifying-glass-chart"></i>
          </div>
          <h3 className="text-lg font-bold text-slate-100 capitalize">{activeTab} Details</h3>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Deep neural evaluation breakdown for {activeTab}. Contains slide-by-slide AI suggestions, vocal pitch consistency maps, and vocabulary richness scores.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => setActiveTab('overview')}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
            >
              Back to Overview
            </button>
            <button
              onClick={onNavigateToDetails}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500"
            >
              View Radar Chart Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
