import { NavLink } from "react-router-dom";
import {
  Home, Upload, Sparkles, FileText, Folder, Settings, LogOut, ChevronDown
} from "lucide-react";

const links = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "Upload", to: "/home", icon: Upload },
  { label: "AI Evaluation", to: "/dashboard", icon: Sparkles },
  { label: "Reports", to: "/recent-presentations", icon: FileText, chevron: true },
  { label: "My Presentations", to: "/recent-presentations", icon: Folder },
  { label: "Settings", to: "/settings", icon: Settings }
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-[250px] flex-col border-r border-[#edf0f0] bg-white xl:w-[291px]">
      <div className="flex h-[99px] items-center border-b border-[#edf0f0] px-5 xl:px-[30px]">
        <img src="/presentation-logo.jpg" alt="Presentation Evaluator" className="w-[235px] h-auto object-contain" />
      </div>

      <nav className="px-4 pt-5 xl:px-5">
        {links.map(({ label, to, icon: Icon, chevron }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `mb-2 flex h-[49px] items-center gap-4 rounded-lg px-4 text-[15px] font-semibold transition ${
                isActive
                  ? "bg-[#eaf7f0] text-[#19875f]"
                  : "text-[#425066] hover:bg-[#f3f8f5]"
              }`
            }
          >
            <Icon size={21} strokeWidth={1.8} />
            <span>{label}</span>
            {chevron && <ChevronDown size={17} className="ml-auto" />}
          </NavLink>
        ))}
      </nav>

      <button className="mx-4 mb-7 mt-auto flex h-[49px] items-center gap-4 rounded-lg px-4 text-left text-[15px] font-semibold text-[#425066] hover:bg-[#f3f5f5]">
        <LogOut size={21} strokeWidth={1.8} />
        Logout
      </button>
    </aside>
  );
}