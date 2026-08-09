export default function Table() {
  return (
    <table className="w-full bg-white border rounded-xl overflow-hidden">
      <thead className="bg-[#F0F7F8]">
        <tr>
          <th className="text-left p-3 text-[#164E63]">Presentation</th>
          <th className="text-left p-3 text-[#164E63]">Date</th>
          <th className="text-left p-3 text-[#164E63]">Score</th>
          <th className="text-left p-3 text-[#164E63]">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t">
          <td className="p-3">AI in Education.pptx</td>
          <td className="p-3">May 20, 2024</td>
          <td className="p-3 font-bold text-[#0074B7]">86/100</td>
          <td className="p-3 text-green-600">Evaluated</td>
        </tr>
        <tr className="border-t">
          <td className="p-3">Future of AI.pptx</td>
          <td className="p-3">May 18, 2024</td>
          <td className="p-3 font-bold text-[#0074B7]">78/100</td>
          <td className="p-3 text-green-600">Evaluated</td>
        </tr>
      </tbody>
    </table>
  );
}