import React from 'react';

export default function MetricCards({ totalEvaluations }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      
      {/* Card 1 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Overall Score</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm">
            <i className="fa-solid fa-chart-line"></i>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">92%</div>
          <div className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
            <i className="fa-solid fa-arrow-up text-[10px]"></i>
            <span>Top 5% speaker tier</span>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Average Cadence</span>
          <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center text-sm">
            <i className="fa-solid fa-microphone"></i>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            135 <span className="text-sm font-bold text-slate-500">WPM</span>
          </div>
          <div className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Optimal keynote pace (125–150)
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Filler Word Rate</span>
          <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center text-sm">
            <i className="fa-solid fa-circle-check"></i>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">0.8%</div>
          <div className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Zero "um" / "like" detected
          </div>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Rehearsals Evaluated</span>
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm">
            <i className="fa-solid fa-desktop"></i>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{totalEvaluations}</div>
          <div className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Total 5.4 practice hours
          </div>
        </div>
      </div>

    </div>
  );
}
