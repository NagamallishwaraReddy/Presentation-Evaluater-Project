import { Upload, Folder, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../context/DashboardContext";

export default function QuickActions() {
  const navigate = useNavigate();
  const { addPresentation } = useDashboard();

  const actions = [
    { title: "Upload Presentation", subtitle: "Start a new evaluation", icon: Upload, color: "#159c69", onClick: () => { addPresentation("New Presentation"); navigate("/recent-presentations"); } },
    { title: "Recent Presentations", subtitle: "Review your work", icon: Folder, color: "#3d72c4", onClick: () => navigate("/recent-presentations") },
    { title: "Preferences", subtitle: "Manage your account", icon: ShieldCheck, color: "#7650b9", onClick: () => navigate("/settings") }
  ];

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-3">
      {actions.map(({ title, subtitle, icon: Icon, color, onClick }, index) => (
        <button
          key={title}
          onClick={onClick}
          className={`flex min-h-[91px] flex-col items-start gap-3 bg-white px-5 text-left ${
            index !== 2 ? "border-b border-[#e8eceb] md:border-b-0 md:border-r" : ""
          }`}
        >
          <Icon size={25} strokeWidth={1.7} style={{ color }} />
          <div>
            <strong className="block text-[13px] text-[#1c283a]">{title}</strong>
            <span className="mt-1 block text-xs text-[#7e8897]">{subtitle}</span>
          </div>
        </button>
      ))}
    </div>
  );
}