import React from 'react';

export default function Header({ darkMode, onToggleTheme, onNewEvaluation }) {
  const logoIcon = window.LOGO_ICON_B64 || './logo-icon-transparent.png';

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Branding & User Logo */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <img 
            src={logoIcon} 
            alt="Presentation Evaluator Icon" 
            className="h-12 w-auto object-contain transition-transform hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="hidden h-10 w-10 rounded-xl bg-gradient-to-tr from-teal-500 via-emerald-500 to-blue-600 items-center justify-center text-white font-bold text-xl">
            <i className="fa-solid fa-chart-line"></i>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white uppercase leading-tight">
              PRESENTATION <span className="text-slate-800 dark:text-slate-200">EVALUATOR</span>
            </h1>
            <div className="h-[1.5px] bg-slate-300 dark:bg-slate-700 w-full my-[2px]"></div>
            <span className="text-[9.5px] font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
              ANALYZE. IMPROVE. SUCCEED.
            </span>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={onToggleTheme}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-100/80 dark:bg-slate-800 text-amber-900 dark:text-amber-300 text-xs font-semibold border border-amber-200/60 dark:border-slate-700"
          >
            <i className={`fa-solid ${darkMode ? 'fa-moon text-indigo-400' : 'fa-sun text-amber-500'}`}></i>
            <span className="capitalize">{darkMode ? 'Dark' : 'Light'}</span>
          </button>

          <button
            onClick={onNewEvaluation}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md shadow-emerald-500/20 flex items-center space-x-2"
          >
            <i className="fa-solid fa-plus text-xs"></i>
            <span>New Evaluation</span>
          </button>

          <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="John Doe Avatar"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
            />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">John Doe</span>
          </div>
        </div>

      </div>
    </header>
  );
}
