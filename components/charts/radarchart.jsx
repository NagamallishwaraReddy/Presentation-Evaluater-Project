export default function RadarChart() {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-[#164E63] mb-4">
        Presentation Evaluation
      </h2>

      <svg viewBox="0 0 300 250" className="w-full">

        {/* Radar background */}
        <polygon
          points="150,30 230,90 200,190 100,190 70,90"
          fill="#E8F5F5"
          stroke="#008B84"
          strokeWidth="2"
        />

        {/* Evaluation area */}
        <polygon
          points="150,50 215,100 185,165 110,175 85,100"
          fill="#008B84"
          fillOpacity="0.35"
          stroke="#008B84"
          strokeWidth="3"
        />

        {/* Labels */}
        <text x="135" y="20" fill="#164E63">
          Content
        </text>

        <text x="235" y="90" fill="#164E63">
          Design
        </text>

        <text x="205" y="210" fill="#164E63">
          Delivery
        </text>

        <text x="55" y="210" fill="#164E63">
          Clarity
        </text>

        <text x="15" y="90" fill="#164E63">
          Structure
        </text>

      </svg>

    </div>
  );
}