// Page 3: Score Details with Radar Chart SVG & Filler Word Analytics Component
const { useState } = React;

export default function ScoreDetailsView({ activePreset }) {
  const { scores, fillerWords, speechStats } = activePreset;

  // Custom Radar Chart SVG Generator Math
  const center = 150;
  const radius = 100;
  const metrics = [
    { label: 'Content', key: 'content', val: scores.content || 88, angle: -90 },
    { label: 'Delivery', key: 'delivery', val: scores.delivery || 78, angle: -18 },
    { label: 'Confidence', key: 'confidence', val: scores.confidence || 90, angle: 54 },
    { label: 'Language', key: 'language', val: scores.language || 82, angle: 126 },
    { label: 'Engagement', key: 'engagement', val: scores.engagement || 84, angle: 198 }
  ];

  // Map metric values (0-100) to SVG polygon coordinates
  const polygonPoints = metrics
    .map((m) => {
      const rad = (m.angle * Math.PI) / 180;
      const r = (m.val / 100) * radius;
      const x = center + r * Math.cos(rad);
      const y = center + r * Math.sin(rad);
      return `${x},${y}`;
    })
    .join(' ');

  // Grid concentric pentagons (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fadeIn">
      {/* Title */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 flex items-center justify-center text-sm">
              <i className="fa-solid fa-chart-radar"></i>
            </span>
            Score Details
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Detailed multidimensional breakdown of your presentation metrics, speech pace, and filler words.
          </p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Card: Radar Chart Visualization (7 cols) */}
        <div className="lg:col-span-7 glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-100">Performance Radar</h3>
              <span className="text-xs text-slate-400 font-medium">5-Axis Multidimensional Analysis</span>
            </div>

            {/* SVG Radar Chart Container */}
            <div className="relative w-full aspect-square max-w-[340px] mx-auto flex items-center justify-center py-4">
              <svg viewBox="0 0 300 300" className="w-full h-full">
                {/* Background Grid Pentagons */}
                {gridLevels.map((lvl, idx) => {
                  const pts = metrics
                    .map((m) => {
                      const rad = (m.angle * Math.PI) / 180;
                      const r = lvl * radius;
                      const x = center + r * Math.cos(rad);
                      const y = center + r * Math.sin(rad);
                      return `${x},${y}`;
                    })
                    .join(' ');
                  return (
                    <polygon
                      key={idx}
                      points={pts}
                      fill="transparent"
                      stroke="rgba(255, 255, 255, 0.08)"
                      strokeWidth="1.5"
                    />
                  );
                })}

                {/* Axes lines from center */}
                {metrics.map((m, idx) => {
                  const rad = (m.angle * Math.PI) / 180;
                  const x = center + radius * Math.cos(rad);
                  const y = center + radius * Math.sin(rad);
                  return (
                    <line
                      key={idx}
                      x1={center}
                      y1={center}
                      x2={x}
                      y2={y}
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                  );
                })}

                {/* Polygon Data Fill */}
                <polygon
                  points={polygonPoints}
                  className="radar-area"
                />

                {/* Data Points & Labels */}
                {metrics.map((m, idx) => {
                  const rad = (m.angle * Math.PI) / 180;
                  const r = (m.val / 100) * radius;
                  const ptX = center + r * Math.cos(rad);
                  const ptY = center + r * Math.sin(rad);

                  // Label placement
                  const lblR = radius + 24;
                  const lblX = center + lblR * Math.cos(rad);
                  const lblY = center + lblR * Math.sin(rad);

                  return (
                    <g key={idx}>
                      <circle cx={ptX} cy={ptY} r="5" className="radar-point" />
                      <text
                        x={lblX}
                        y={lblY}
                        fill="#cbd5e1"
                        fontSize="11"
                        fontWeight="600"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {m.label} ({m.val})
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Quick Legend */}
          <div className="grid grid-cols-5 gap-2 text-center pt-4 border-t border-slate-800">
            {metrics.map((m, i) => (
              <div key={i} className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block truncate">{m.label}</span>
                <span className="text-xs font-bold text-indigo-300">{m.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Cards: Filler Words & Speech Stats (5 cols) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          {/* Filler Words Card */}
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <i className="fa-solid fa-microphone-slash text-indigo-400"></i>
                Filler Words Detected
              </h3>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {fillerWords.status}
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-white">{fillerWords.total}</span>
              <span className="text-xs text-slate-400">Total Filler Words</span>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-semibold block">Most Used:</span>
              {fillerWords.mostUsed.map((fw, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                    <span className="font-mono text-indigo-300 font-semibold">"{fw.word}"</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">{fw.pct}</span>
                    <span className="font-bold text-slate-200 bg-slate-800 px-2 py-0.5 rounded">{fw.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Speech Statistics Card */}
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <i className="fa-solid fa-chart-simple text-purple-400"></i>
                Speech Statistics
              </h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {speechStats.paceRating}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <i className="fa-regular fa-clock text-indigo-400 text-sm mb-1 block"></i>
                <span className="text-[10px] text-slate-400 block">Total Duration</span>
                <span className="text-sm font-bold text-slate-200">{speechStats.durationSeconds ? `${Math.floor(speechStats.durationSeconds / 60)}:${speechStats.durationSeconds % 60 < 10 ? '0' : ''}${speechStats.durationSeconds % 60}` : '12:45'}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <i className="fa-solid fa-font text-purple-400 text-sm mb-1 block"></i>
                <span className="text-[10px] text-slate-400 block">Words Spoken</span>
                <span className="text-sm font-bold text-slate-200">{speechStats.wordsSpoken}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                <i className="fa-solid fa-gauge-high text-emerald-400 text-sm mb-1 block"></i>
                <span className="text-[10px] text-slate-400 block">Speaking Rate</span>
                <span className="text-sm font-bold text-emerald-400">{speechStats.speakingRateWPM} <span className="text-[10px] text-slate-500">wpm</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Speech Audio Waveform Timeline Simulation */}
      <div className="glass-card p-6 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <i className="fa-solid fa-waveform text-indigo-400"></i>
            Interactive Audio Waveform & Filler Marker Timeline
          </h4>
          <span className="text-xs text-slate-400">Audio Preview: {activePreset.fileName}</span>
        </div>

        <div className="h-14 bg-slate-950/80 rounded-xl border border-slate-800 p-2 flex items-center gap-1 overflow-hidden relative">
          {/* Simulated Bars */}
          {[...Array(64)].map((_, i) => {
            const h = Math.floor(Math.sin(i * 0.4) * 18 + 24);
            const isFiller = [12, 18, 25, 34, 42, 51].includes(i);
            return (
              <div
                key={i}
                style={{ height: `${h}px` }}
                className={`flex-1 rounded-full transition-all ${
                  isFiller ? 'bg-rose-500 animate-pulse' : 'bg-indigo-600/60 hover:bg-indigo-400'
                }`}
                title={isFiller ? 'Filler word detected at this timestamp' : `Segment ${i}`}
              ></div>
            );
          })}
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>00:00</span>
          <span className="text-rose-400 font-semibold"><i className="fa-solid fa-circle text-[8px] mr-1"></i>Red markers indicate filler word occurrences</span>
          <span>12:45</span>
        </div>
      </div>
    </div>
  );
}
