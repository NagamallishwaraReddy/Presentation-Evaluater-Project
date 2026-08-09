export default function EmptyState() {
  return (
    <div className="text-center bg-white border rounded-xl p-8">
        <div className="text-5xl mb-3">📂</div>
        <h2 className="text-xl font-bold text-[#164E63]">No Presentations</h2>
        <p className="text-gray-500 my-3">You haven't uploaded any presentations yet.</p>
        <button className="bg-[#0074B7] text-white px-4 py-2 rounded-lg">Upload Presentation</button>
    </div>
  );
}