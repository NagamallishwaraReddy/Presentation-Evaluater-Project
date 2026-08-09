export default function SearchBar() {
  return (
    <div className="bg-white border rounded-lg px-3 py-2 flex items-center gap-2 w-64">
      <span className="text-gray-500">
        🔍
      </span>
      <input
        type="text"
        placeholder="Search presentations..."
        className="w-full outline-none text-sm text-[#164E63] placeholder-gray-400"
      />
    </div>
  );
}