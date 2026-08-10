import { ClipboardCheck, FileText, Mic2, Globe2, ShieldCheck } from "lucide-react";

const iconMap = { ClipboardCheck, FileText, Mic2, Globe2, ShieldCheck };

export default function ScoreCard({ title, score, label, change, color, icon }) {
  const Icon = iconMap[icon] || ClipboardCheck;

  return (
    <div className="min-h-[199px] rounded-[11px] border border-[#edf0f1] bg-white p-[18px] shadow-panel">
      <div className="flex items-center justify-between">
        <span className="whitespace-nowrap text-[13px] font-bold text-[#263246]">{title}</span>
        <Icon size={20} strokeWidth={1.9} style={{ color }} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-[28px] font-extrabold tracking-[-1px] text-[#142137]">
          {score}<span className="ml-1 text-xs font-medium tracking-normal text-[#8792a1]">/100</span>
        </div>

        <div
          className="grid h-[75px] w-[75px] place-items-center rounded-full"
          style={{ background: `conic-gradient(${color} ${score * 3.6}deg, #edf3f1 ${score * 3.6}deg)` }}
        >
          <div className="grid h-[61px] w-[61px] place-items-center rounded-full bg-white text-[13px] font-medium text-[#6e7886]">
            {score}%
          </div>
        </div>
      </div>

      <div className="mt-2 text-[13px] font-bold" style={{ color }}>{label}</div>
      <div className="mt-3 text-xs font-bold text-[#159c69]">↑ {change}</div>
    </div>
  );
}