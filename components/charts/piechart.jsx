export default function PieChart() {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-[#164E63] mb-4">
        Evaluation Score
      </h2>

      <div
        className="w-40 h-40 rounded-full mx-auto"
        style={{
          background:
            "conic-gradient(#008B84 0% 86%, #E5E7EB 86% 100%)"
        }}
      >
        <div className="w-28 h-28 bg-white rounded-full relative top-6 left-6 flex items-center justify-center">
          <span className="text-3xl font-bold text-[#164E63]">
            86%
          </span>
        </div>
      </div>

      <p className="text-center text-[#2ECC71] mt-4">
        Very Good
      </p>
    </div>
  );
}