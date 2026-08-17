import { FileText, Search } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";

export default function RecentPresentations() {
  const { filteredPresentations, search } = useDashboard();

  return (
    <div className="mx-auto max-w-[1180px] p-6 xl:px-[34px] xl:py-[30px]">
      <div className="mb-6">
        <div className="mb-2 text-sm font-bold text-[#18865d]">Dashboard / Presentations</div>
        <h1 className="text-3xl font-extrabold">Recent Presentations</h1>
        <p className="mt-2 text-sm text-[#7c8795]">Review previous work and evaluation scores.</p>
      </div>

      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#edf0f1] p-5">
          <h2 className="font-bold">Presentation History</h2>
          {search && <span className="text-xs text-[#7d8795]">Filtered by “{search}”</span>}
        </div>

        <div>
          {filteredPresentations.map((p) => (
            <div key={p.id} className="flex flex-col gap-3 border-b border-[#edf0f1] p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#eaf7f0] text-[#159c69]"><FileText size={21}/></div>
                <div>
                  <strong className="block text-sm">{p.title}</strong>
                  <span className="text-xs text-[#8a94a2]">{p.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-xs font-semibold text-[#667285]">{p.status}</span>
                <span className="min-w-14 text-right font-extrabold text-[#159c69]">{p.score ? `${p.score}/100` : "—"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}