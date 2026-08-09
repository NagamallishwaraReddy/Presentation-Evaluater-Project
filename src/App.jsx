import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import MetricCards from './components/MetricCards';
import RecentEvaluations from './components/RecentEvaluations';
import UploadModal from './components/UploadModal';
import ReportModal from './components/ReportModal';

const INITIAL_EVALUATIONS = [
  {
    id: 'eval-1',
    title: 'Q3 Product Strategy Pitch',
    date: 'Yesterday',
    pace: '138 WPM',
    score: 92,
    duration: '08:45',
    fillerCount: 3,
    fillerRate: '0.6%',
    clarityScore: '95%',
    confidenceScore: '94%',
    tier: 'Top 5% speaker tier',
    status: 'Optimal Pace',
    transcript: [
      { time: '00:05', text: 'Good morning everyone. Today I am excited to present our Q3 product strategy.', filler: false },
      { time: '00:14', text: 'Our key focus areas include customer retention and AI-driven workflow tools.', filler: false },
      { time: '00:28', text: 'Now, um, moving on to our primary user acquisition channels...', filler: true, word: 'um' },
      { time: '00:45', text: 'We observed a 24% increase in organic signups following the v2.4 release.', filler: false },
      { time: '01:10', text: 'Like, our product adoption metrics indicate strong product-market fit.', filler: true, word: 'like' },
      { time: '01:35', text: 'To wrap up, our roadmap for next quarter prioritizes speed, security, and scalability.', filler: false }
    ],
    strengths: [
      'Excellent articulation and cadence maintaining optimal 135–140 WPM.',
      'Very low filler word usage across the entire 8-minute presentation.',
      'Strong vocal energy during the vision and ROI sections.'
    ],
    improvements: [
      'Brief pause recommended between slides 4 and 5 to let key data digest.',
      'Slight speed increase detected during Q&A transition section.'
    ]
  },
  {
    id: 'eval-2',
    title: 'AI Pitch Deck Keynote',
    date: '3 days ago',
    pace: '132 WPM',
    score: 87,
    duration: '14:20',
    fillerCount: 7,
    fillerRate: '0.9%',
    clarityScore: '91%',
    confidenceScore: '89%',
    tier: 'Top 10% speaker tier',
    status: 'Great Delivery',
    transcript: [
      { time: '00:10', text: 'Welcome investors and partners to our annual keynote.', filler: false },
      { time: '00:30', text: 'Artificial intelligence is reshaping how organizations analyze video and voice.', filler: false },
      { time: '01:05', text: 'You know, our technology automates feedback in real time.', filler: true, word: 'you know' },
      { time: '01:40', text: 'We have secured 12 enterprise pilot contracts this quarter alone.', filler: false }
    ],
    strengths: [
      'Compelling opening hook with clear tone modulation.',
      'Ideal slide pacing and clear enunciation.'
    ],
    improvements: [
      'Reduce use of phrase "you know" during market sizing explanation.'
    ]
  },
  {
    id: 'eval-3',
    title: 'Executive Board Q4 Overview',
    date: '1 week ago',
    pace: '141 WPM',
    score: 95,
    duration: '11:15',
    fillerCount: 2,
    fillerRate: '0.4%',
    clarityScore: '98%',
    confidenceScore: '96%',
    tier: 'Top 2% speaker tier',
    status: 'Exceptional',
    transcript: [
      { time: '00:08', text: 'Members of the board, I will walk you through our Q4 performance highlights.', filler: false },
      { time: '00:45', text: 'Revenue grew 32% year-over-year while operational expenses decreased by 8%.', filler: false }
    ],
    strengths: [
      'Flawless executive delivery with authoritative pace.',
      'Minimal filler word count and exceptional clarity.'
    ],
    improvements: [
      'Slightly expand closing conclusion summary.'
    ]
  }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [evaluations, setEvaluations] = useState(INITIAL_EVALUATIONS);
  const [selectedEval, setSelectedEval] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const filteredEvaluations = useMemo(() => {
    return evaluations.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [evaluations, searchTerm]);

  const handleUploadComplete = (newEval) => {
    setEvaluations([newEval, ...evaluations]);
    setShowUploadModal(false);
    setSelectedEval(newEval);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Navbar Header */}
      <Header 
        darkMode={darkMode} 
        onToggleTheme={toggleTheme} 
        onNewEvaluation={() => setShowUploadModal(true)} 
      />

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Hero Banner */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>⚡ AI Speech Evaluation Engine Active</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, John Doe!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Your speech delivery score improved by <span className="font-bold text-emerald-600 dark:text-emerald-400">+8.4%</span> this month. Upload a new recording or review past presentations.
              </p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/20 transition-transform active:scale-95 flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-upload"></i>
              <span>Upload Presentation (.mp4 / .wav)</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <MetricCards totalEvaluations={evaluations.length + 10} />

        {/* Recent Speech Evaluations Table */}
        <RecentEvaluations 
          evaluations={filteredEvaluations} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          onSelectReport={(item) => setSelectedEval(item)} 
        />

      </main>

      {/* Modals */}
      {selectedEval && (
        <ReportModal evalData={selectedEval} onClose={() => setSelectedEval(null)} />
      )}

      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} onComplete={handleUploadComplete} />
      )}

    </div>
  );
}
