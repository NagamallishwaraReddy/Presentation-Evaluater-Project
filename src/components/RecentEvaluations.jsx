import React from 'react';

export default function RecentEvaluations({ evaluations, searchTerm, setSearchTerm, onSelectReport }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Speech Evaluations</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Detailed AI-generated reports with transcript and delivery breakdowns
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
          <input
            type="text"
            placeholder="Search presentations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
              <th className="py-3 px-4">PRESENTATION TITLE</th>
              <th className="py-3 px-4">DATE</th>
              <th className="py-3 px-4">PACE</th>
              <th className="py-3 px-4">SCORE</th>
              <th className="py-3 px-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium">
            {evaluations.map((item) => (
              <tr 
                key={item.id} 
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                onClick={() => onSelectReport(item)}
              >
                <td className="py-4 px-4 font-bold text-slate-900 dark:text-white flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs flex-shrink-0">
                    <i className="fa-solid fa-file-video"></i>
                  </div>
                  <span>{item.title}</span>
                </td>
                <td className="py-4 px-4 text-slate-500 dark:text-slate-400">{item.date}</td>
                <td className="py-4 px-4 font-semibold text-slate-700 dark:text-slate-300">{item.pace}</td>
                <td className="py-4 px-4 font-bold text-emerald-600 dark:text-emerald-400 text-sm">{item.score}%</td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectReport(item);
                    }}
                    className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold text-xs shadow-sm transition-all"
                  >
                    View Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
