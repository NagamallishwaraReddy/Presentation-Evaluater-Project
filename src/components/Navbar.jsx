import { Search, Sun, Bell, ChevronDown } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";

export default function Navbar() {
  const { search, setSearch, theme, setTheme } = useDashboard();

  return (
    <header className="fixed left-[250px] right-0 top-0 z-30 flex h-[99px] items-center justify-between gap-5 border-b border-[#edf0f0] bg-white px-6 xl:left-[291px] xl:px-[35px]">
      <div className="flex h-[49px] w-full max-w-[438px] items-center gap-3 rounded-[11px] border border-[#e7ebeb] bg-white px-4 text-[#8290a1]">
        <Search size={21} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search presentations, reports..."
          className="w-full border-0 bg-transparent text-[15px] text-[#29364b] outline-none placeholder:text-[#9aa5b3]"
        />
      </div>

      <div className="flex items-center gap-3 xl:gap-6">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="flex h-[42px] items-center gap-2 rounded-full border border-[#e6e9e8] bg-white px-4 text-sm font-semibold text-[#263246]"
        >
          <Sun size={18} className="text-[#e2a23e]" />
          Light
        </button>

        <button className="hidden h-[43px] items-center gap-2 rounded-full bg-[#119b64] px-5 text-sm font-bold text-white shadow-sm hover:bg-[#0c8b59] md:flex">
          <span className="text-2xl font-normal leading-none">+</span>
          New Evaluation
        </button>

        <button className="relative bg-transparent p-1 text-[#1e293b]">
          <Bell size={23} strokeWidth={1.7} />
          <span className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full border-2 border-white bg-[#159c69] text-[10px] font-extrabold text-white">2</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="grid h-[43px] w-[43px] place-items-center rounded-full bg-[#24262b] text-sm font-semibold text-white">JD</div>
          <div className="hidden flex-col gap-[2px] lg:flex">
            <strong className="text-sm">John Doe</strong>
            <span className="text-xs text-[#7d8795]">Admin</span>
          </div>
          <ChevronDown size={18} className="hidden lg:block" />
        </div>
      </div>
    </header>
  );
}