import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScoreCard from "../components/ScoreCard";
import QuickActions from "../components/QuickActions";
import Insights from "../components/Insights";
import { useDashboard } from "../context/DashboardContext";

const scores = [
  { title: "Overall Score", score: 86, label: "Very Good", change: "8% from last evaluation", color: "#159c69", icon: "ClipboardCheck" },
  { title: "Content Score", score: 88, label: "Great", change: "10%", color: "#159c69", icon: "FileText" },
  { title: "Delivery Score", score: 78, label: "Good", change: "5%", color: "#e49b31", icon: "Mic2" },
  { title: "Language Score", score: 82, label: "Very Good", change: "7%", color: "#3d72c4", icon: "Globe2" },
  { title: "Confidence Score", score: 90, label: "Excellent", change: "12%", color: "#7650b9", icon: "ShieldCheck" }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { filteredPresentations } = useDashboard();

  return (
    <div className="mx-auto max-w-[1180px] p-6 xl:px-[34px] xl:py-[26px]">
      <div className="mb-6 flex items-end justify-between gap-5">
        <div>
          <div className="mb-2 text-sm font-bold text-[#18865d]">Dashboard</div>
          <h1 className="mb-2 text-[29px] font-extrabold tracking-[-.6px]">Results Overview</h1>
          <p className="text-sm text-[#7c8795]">Detailed analysis of your presentation performance</p>
        </div>

        <div className="hidden gap-3 sm:flex">
          <button onClick={() => navigate("/recent-presentations")} className="h-[45px] rounded-lg border border-[#e6e9e8] bg-white px-5 text-sm font-semibold text-[#263246]">
            View all
          </button>
          <button onClick={() => navigate("/home")} className="flex h-[45px] items-center gap-2 rounded-lg bg-[#119b64] px-5 text-sm font-bold text-white">
            <Upload size={18} /> New Evaluation
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {scores.map((item) => <ScoreCard key={item.title} {...item} />)}
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[1.7fr_.9fr]">
        <section className="panel min-h-[278px] p-5">
          <h2 className="text-[18px] font-bold">Welcome back, John <span className="text-base">👋</span></h2>
          <p className="mt-1.5 text-[13px] text-[#7d8795]">Keep improving your presentation skills.</p>
          <QuickActions />
        </section>

        <Insights />
      </section>

      <section className="panel mt-6 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Recent Presentations</h2>
            <p className="mt-1 text-xs text-[#7d8795]">Your latest presentation evaluations</p>
          </div>
          <button onClick={() => navigate("/recent-presentations")} className="text-sm font-bold text-[#159c69]">View all →</button>
        </div>
        <div className="grid gap-2">
          {filteredPresentations.slice(0, 3).map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-lg border border-[#edf0f1] px-4 py-3">
              <div>
                <strong className="text-sm">{p.title}</strong>
                <span className="ml-3 text-xs text-[#8a94a2]">{p.date}</span>
              </div>
              <span className="font-bold text-[#159c69]">{p.score ? `${p.score}/100` : p.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}