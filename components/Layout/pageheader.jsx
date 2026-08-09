export default function PageHeader({ title, description }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-[#164E63]">{title}</h1>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      <div className="w-12 h-1 bg-[#008B84] mt-3 rounded"></div>
    </div>
  );
}