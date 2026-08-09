// Main React Application Component for Module 4 Presentation Evaluator
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import AIEvaluationView from './components/AIEvaluationView.jsx';
import AIFeedbackView from './components/AIFeedbackView.jsx';
import ScoreDetailsView from './components/ScoreDetailsView.jsx';
import UploadModal from './components/UploadModal.jsx';
import ArchitecturePanel from './components/ArchitecturePanel.jsx';
import ReportModal from './components/ReportModal.jsx';
import { PRESENTATION_PRESETS, PIPELINE_STEPS, CODE_SNIPPETS, WORKFLOW_STEPS } from './data/mockData.js';

const { useState, useEffect } = React;

export default function App() {
  const [activeView, setActiveView] = useState('evaluation');
  const [presets, setPresets] = useState(PRESENTATION_PRESETS);
  const [activePreset, setActivePreset] = useState(PRESENTATION_PRESETS[0]);
  const [progress, setProgress] = useState(72);
  const [isSimulating, setIsSimulating] = useState(false);

  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Live Timer Simulation effect
  useEffect(() => {
    let timer;
    if (isSimulating && progress < 100) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsSimulating(false);
            return 100;
          }
          return prev + 1;
        });
      }, 150);
    } else if (progress >= 100) {
      setIsSimulating(false);
    }
    return () => clearInterval(timer);
  }, [isSimulating, progress]);

  const handlePresetSelect = (preset) => {
    setActivePreset(preset);
    setProgress(72);
    setIsSimulating(false);
  };

  const handleUploadSuccess = (newPreset) => {
    setPresets([newPreset, ...presets]);
    setActivePreset(newPreset);
    setProgress(15);
    setIsSimulating(true);
    setActiveView('evaluation');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenArch={() => setActiveView('architecture')}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Header
          activePreset={activePreset}
          presets={presets}
          onSelectPreset={handlePresetSelect}
          onOpenUpload={() => setIsUploadOpen(true)}
          onOpenReport={() => setIsReportOpen(true)}
          onOpenArch={() => setActiveView('architecture')}
        />

        {/* View Router Body */}
        <main className="p-6 flex-1 max-w-7xl mx-auto w-full">
          {activeView === 'evaluation' && (
            <AIEvaluationView
              activePreset={activePreset}
              progress={progress}
              setProgress={setProgress}
              isSimulating={isSimulating}
              setIsSimulating={setIsSimulating}
              onFinishEvaluation={() => setActiveView('feedback')}
            />
          )}

          {activeView === 'feedback' && (
            <AIFeedbackView
              activePreset={activePreset}
              onNavigateToDetails={() => setActiveView('scoredetails')}
              onOpenReport={() => setIsReportOpen(true)}
            />
          )}

          {activeView === 'scoredetails' && (
            <ScoreDetailsView activePreset={activePreset} />
          )}

          {activeView === 'architecture' && (
            <ArchitecturePanel
              codeSnippets={CODE_SNIPPETS}
              workflowSteps={WORKFLOW_STEPS}
            />
          )}

          {['dashboard', 'presentations'].includes(activeView) && (
            <div className="glass-card p-12 rounded-2xl text-center space-y-4 max-w-2xl mx-auto my-12">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 mx-auto flex items-center justify-center text-3xl">
                <i className="fa-solid fa-folder-open"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-100 capitalize">{activeView} Overview</h3>
              <p className="text-sm text-slate-400">
                You are currently inspecting Module 4: AI Evaluation Module. Switch to AI Evaluation, AI Feedback, or Score Details to test the live evaluation features.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveView('evaluation')}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20"
                >
                  Go to AI Evaluation Module
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
        presets={presets}
        onSelectPreset={handlePresetSelect}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        activePreset={activePreset}
      />
    </div>
  );
}
