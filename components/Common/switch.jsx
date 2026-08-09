export default function Switch({ label }) {
  return (
    <label className="flex items-center justify-between bg-white p-3 rounded-lg border">

      <span className="text-sm text-[#164E63]">
        {label}
      </span>

      <input
        type="checkbox"
        className="w-5 h-5 accent-[#008B84]"
      />

    </label>
  );
}