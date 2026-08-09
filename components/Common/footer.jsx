export default function Footer() {
  return (
    <footer className="bg-white border-t p-6">
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-[#008B84]">Presentation Evaluator</h2>
          <p className="text-sm text-gray-500 mt-2">AI-powered presentation evaluation.</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#164E63]">Support</h3>
          <p className="text-sm text-gray-500">Help Center</p>
          <p className="text-sm text-gray-500">Contact</p>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-6">© 2026 Presentation Evaluator. All rights reserved.</p>
    </footer>
  );
}