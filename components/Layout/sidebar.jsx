export default function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-[#0074B7] text-white p-4">
      <h2 className="text-lg font-bold mb-6">
        Presentation
        <span className="text-[#7DE2D1]"> Evaluator</span>
      </h2>
        <div className="space-y-2">
        <button className="w-full text-left px-4 py-3 rounded-lg bg-[#008B84]">🏠 Dashboard</button>
        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#008B84]">📤 Upload</button>
        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#008B84]">🤖 AI Evaluation</button>
        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#008B84]">📊 Reports</button>
        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#008B84]">📁 My Presentations</button>
        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#008B84]">⚙️ Settings</button>
        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#008B84]">🚪 Logout</button>
      </div>
    </aside>
  );
}