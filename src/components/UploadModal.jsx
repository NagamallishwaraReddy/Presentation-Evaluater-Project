import React, { useState } from 'react';

export default function UploadModal({ onClose, onComplete }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [titleInput, setTitleInput] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setTitleInput(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const startAnalysis = () => {
    if (!selectedFile && !titleInput) return;

    setIsAnalyzing(true);
    setProgress(20);
    setStepText('Extracting audio stream...');

    setTimeout(() => {
      setProgress(50);
      setStepText('Neural speech transcription with Whisper AI...');
    }, 1200);

    setTimeout(() => {
      setProgress(80);
      setStepText('Analyzing cadence & filler word frequency...');
    }, 2400);

    setTimeout(() => {
      setProgress(100);
      setStepText('Generating speech report...');
    }, 3600);

    setTimeout(() => {
      const newReport = {
        id: 'eval-' + Date.now(),
        title: titleInput || 'New Presentation Evaluation',
        date: 'Just now',
        pace: '136 WPM',
        score: 91,
        duration: '06:30',
        fillerCount: 4,
        fillerRate: '0.7%',
        clarityScore: '94%',
        confidenceScore: '92%',
        tier: 'Top 5% speaker tier',
        status: 'Optimal Pace',
        transcript: [
          { time: '00:04', text: 'Welcome team. Today I want to walk through our project roadmap.', filler: false },
          { time: '00:18', text: 'Um, we have achieved major milestones in our latest deployment.', filler: true, word: 'um' }
        ],
        strengths: ['Clear and articulate pronunciation of key technical terms.'],
        improvements: ['Minor filler word detected during transition to slide 2.']
      };
      onComplete(newReport);
    }, 4200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Upload Speech Recording</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {!isAnalyzing ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center bg-slate-50 dark:bg-slate-800/40 relative cursor-pointer">
              <input type="file" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <i className="fa-solid fa-cloud-arrow-up text-3xl text-emerald-500 mb-2"></i>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {selectedFile ? selectedFile.name : 'Drag & drop file here or click to browse'}
              </p>
            </div>
            <input
              type="text"
              placeholder="Presentation Title"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
            />
            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-500">Cancel</button>
              <button onClick={startAnalysis} className="bg-emerald-500 text-white px-5 py-2 rounded-xl text-xs font-bold">Start Evaluation</button>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="text-sm font-bold">{stepText}</div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-xs text-emerald-600 font-bold">{progress}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
