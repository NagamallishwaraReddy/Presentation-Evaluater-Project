// Page 1: AI Evaluation Live Progress & Pipeline Stepper Component
const { useState, useEffect } = React;

export default function AIEvaluationView({
  activePreset,
  progress,
  setProgress,
  isSimulating,
  setIsSimulating,
  onFinishEvaluation
}) {
  const steps = [
    { id: 1, name: 'Extracting Slides', threshold: 25 },
    { id: 2, name: 'Speech to Text', threshold: 50 },
    { id: 3, name: 'AI Analysis', threshold: 85 },
    { id: 4, name: 'Generating Report', threshold: 100 }
  ];

  const checklistItems = [
    { label: `Extracting text from ${activePreset.slideCount} slides`, step: 1 },
    { label: 'Converting speech to text (Whisper API)', step: 2 },
    { label: 'Analyzing content quality (GPT-4 / Gemini)', step: 3 },
    { label: 'Evaluating delivery & pronunciation', step: 3 },
    { label: 'Generating AI feedback & radar metrics', step: 4 }
  ];

  // Circle SVG math
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fadeIn">
      {/* Top Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 flex items-center justify-center text-sm">
              <i className="fa-solid fa-brain"></i>
            </span>
            AI Evaluation
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Our AI is analyzing your presentation. This process runs speech-to-text, slide OCR, and deep LLM metrics.
          </p>
        </div>

        {/* Live Simulation Control Panel */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-xl">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              isSimulating
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-indigo-600 text-white hover:bg-indigo-500'
            }`}
          >
            <i className={`fa-solid ${isSimulating ? 'fa-pause' : 'fa-play'}`}></i>
            <span>{isSimulating ? 'Pause Analysis' : 'Run Live Analysis'}</span>
          </button>

          <button
            onClick={() => setProgress(100)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Skip to 100%
          </button>

          <button
            onClick={() => {
              setProgress(0);
              setIsSimulating(true);
            }}
            className="p-1.5 px-2.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 bg-slate-800/40"
          >
            <i className="fa-solid fa-rotate-left"></i>
          </button>
        </div>
      </div>

      {/* Uploaded File Detail Card */}
      <div className="glass-card p-4 rounded-2xl flex items-center justify-between gap-4 border border-indigo-500/20 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xl shadow-inner">
            <i className="fa-solid fa-file-powerpoint"></i>
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">{activePreset.fileName}</h3>
            <p className="text-xs text-slate-400">
              Uploaded on {activePreset.uploadDate} • <span className="text-slate-300 font-semibold">{activePreset.fileSize}</span> • {activePreset.slideCount} Slides
            </p>
          </div>
        </div>

        <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2">
          <i className="fa-regular fa-eye"></i>
          <span>View File</span>
        </button>
      </div>

      {/* Step Pipeline Stepper */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="relative flex items-center justify-between mb-8">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-slate-800 z-0">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, (progress / 100) * 100))}%` }}
            ></div>
          </div>

          {steps.map((s, idx) => {
            const isCompleted = progress >= s.threshold;
            const isInProgress = progress > (steps[idx - 1]?.threshold || 0) && progress < s.threshold;

            return (
              <div key={s.id} className="relative z-10 flex flex-col items-center group">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20'
                      : isInProgress
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/30 animate-pulse'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {isCompleted ? (
                    <i className="fa-solid fa-check text-sm"></i>
                  ) : (
                    <span>{s.id}</span>
                  )}
                </div>
                <span
                  className={`text-xs mt-2 font-semibold ${
                    isCompleted ? 'text-emerald-400' : isInProgress ? 'text-indigo-300 font-bold' : 'text-slate-500'
                  }`}
                >
                  {s.name}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">
                  {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Circular Gauge Loader Card */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <div className="relative w-40 h-40 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-indigo-500 transition-all duration-300"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-white tracking-tight">{progress}%</span>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider mt-0.5">
                {progress === 100 ? 'Complete' : 'Processing'}
              </span>
            </div>
          </div>

          <h4 className="text-lg font-bold text-slate-100">
            {progress === 100 ? 'Evaluation Finished!' : 'Analyzing your presentation...'}
          </h4>

          {/* Detailed Progress Checklist */}
          <div className="w-full max-w-md mt-6 space-y-3 text-left">
            {checklistItems.map((item, idx) => {
              const itemCompleted = progress >= item.step * 25;
              const itemActive = progress > (item.step - 1) * 25 && progress < item.step * 25;

              return (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  {itemCompleted ? (
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-check text-[10px]"></i>
                    </span>
                  ) : itemActive ? (
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center shrink-0 animate-spin">
                      <i className="fa-solid fa-circle-notch text-[10px]"></i>
                    </span>
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-600 flex items-center justify-center shrink-0">
                      <i className="fa-regular fa-circle text-[10px]"></i>
                    </span>
                  )}
                  <span className={itemCompleted ? 'text-slate-300 font-medium' : itemActive ? 'text-indigo-300 font-bold' : 'text-slate-500'}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {progress === 100 && (
            <button
              onClick={onFinishEvaluation}
              className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
            >
              <span>View Full Feedback & Scores</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          )}
        </div>
      </div>

      {/* Warning Notice Banner */}
      <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-circle-info text-indigo-400 text-base"></i>
          <p className="text-xs text-indigo-200">
            Please don't close this page. You will be automatically redirected to the detailed score dashboard when AI evaluation completes.
          </p>
        </div>
        <span className="text-xs font-mono text-indigo-400 font-bold bg-indigo-900/60 px-2.5 py-1 rounded-lg">
          Module 4 Active
        </span>
      </div>
    </div>
  );
}
