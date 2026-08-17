import { Sparkles, CheckCircle2, CircleAlert, Eye } from "lucide-react";

export default function Insights() {
  return (
    <section className="panel min-h-[278px] p-5">
      <div className="flex items-center gap-3">
        <Sparkles size={24} color="#159c69" />
        <h2 className="text-[18px] font-bold">Key Insights</h2>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        <div className="flex items-center gap-3.5 text-[13px] font-semibold text-[#465267]">
          <CheckCircle2 size={21} color="#48aa86" />
          Your content quality is excellent!
        </div>
        <div className="flex items-center gap-3.5 text-[13px] font-semibold text-[#465267]">
          <CircleAlert size={21} color="#e3a145" />
          Work on reducing filler words.
        </div>
        <div className="flex items-center gap-3.5 text-[13px] font-semibold text-[#465267]">
          <Eye size={21} color="#4b7fc7" />
          Good eye contact maintained.
        </div>
      </div>

      <button className="mt-6 h-[38px] w-full rounded-lg bg-[#e9f7f0] text-[13px] font-bold text-[#378764]">
        View Detailed Feedback
      </button>
    </section>
  );
}