import React, { useState } from 'react';

export default function ReportModal({ evalData, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              Score: {evalData.score}% ({evalData.tier})
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{evalData.title}</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center"
              >
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play ml-0.5'}`}></i>
              </button>
              <div>
                <p className="text-xs font-bold">Presentation Audio Track</p>
                <p className="text-[10px] text-slate-400 font-mono">01:15 / {evalData.duration}</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {isPlaying ? '▶ Playing' : '⏸ Paused'}
            </span>
          </div>

          <div className="flex items-center space-x-1 h-10 px-2 bg-slate-950/80 rounded-xl">
            {Array.from({ length: 40 }).map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 rounded-full ${idx === 12 ? 'bg-rose-500' : idx < 18 ? 'bg-emerald-400' : 'bg-slate-700'}`}
                style={{ height: `${((idx * 9) % 65) + 20}%` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-[11px] font-bold text-slate-400">Cadence</span>
            <p className="text-lg font-black mt-1">{evalData.pace}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-[11px] font-bold text-slate-400">Filler Words</span>
            <p className="text-lg font-black text-emerald-600 mt-1">{evalData.fillerRate}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-[11px] font-bold text-slate-400">Clarity</span>
            <p className="text-lg font-black mt-1">{evalData.clarityScore}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="text-[11px] font-bold text-slate-400">Confidence</span>
            <p className="text-lg font-black mt-1">{evalData.confidenceScore}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600">Key Strengths</h4>
          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
            {evalData.strengths.map((s, i) => (
              <li key={i}>✓ {s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
