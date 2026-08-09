export default function Navbar() {
  return (
    <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
      <h1 className="text-lg font-bold text-[#164E63]">
        Presentation
        <span className="text-[#008B84]"> Evaluator</span>
      </h1>
      <input
        type="text"
        placeholder="Search presentations, reports..."
        className="w-64 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#008B84]"
      />
      <div className="flex items-center gap-4">
        <span className="text-[#164E63]">🔔</span>
        <span className="text-[#164E63]">🌙</span>
        <div className="text-sm">
          <p className="font-semibold text-[#164E63]">John Doe</p>
          <p className="text-gray-500">Admin</p>
        </div>
      </div>
    </nav>
  );
}