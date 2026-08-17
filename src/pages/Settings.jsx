import { useDashboard } from "../context/DashboardContext";

export default function Settings() {
  const { theme, setTheme } = useDashboard();

  return (
    <div className="mx-auto max-w-[900px] p-6 xl:px-[34px] xl:py-[30px]">
      <div className="mb-6">
        <div className="mb-2 text-sm font-bold text-[#18865d]">Dashboard / Settings</div>
        <h1 className="text-3xl font-extrabold">Settings</h1>
        <p className="mt-2 text-sm text-[#7c8795]">Manage dashboard preferences and account options.</p>
      </div>

      <div className="grid gap-5">
        <section className="panel p-6">
          <h2 className="font-bold">Profile</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">Name<input defaultValue="John Doe" className="h-11 rounded-lg border border-[#dfe5e3] px-3"/></label>
            <label className="grid gap-2 text-sm font-semibold">Role<input defaultValue="Admin" className="h-11 rounded-lg border border-[#dfe5e3] px-3"/></label>
          </div>
        </section>

        <section className="panel p-6">
          <h2 className="font-bold">Appearance</h2>
          <p className="mt-1 text-sm text-[#7d8795]">Theme used throughout the dashboard.</p>
          <div className="mt-5 flex gap-3">
            {["light", "dark"].map((value) => (
              <button key={value} onClick={() => setTheme(value)} className={`rounded-lg border px-5 py-3 text-sm font-bold capitalize ${theme === value ? "border-[#159c69] bg-[#eaf7f0] text-[#159c69]" : "border-[#e3e8e6] bg-white"}`}>
                {value}
              </button>
            ))}
          </div>
        </section>

        <section className="panel p-6">
          <h2 className="font-bold">Notifications</h2>
          <label className="mt-5 flex items-center justify-between rounded-lg bg-[#f7f9f8] p-4 text-sm font-semibold">
            Evaluation notifications
            <input type="checkbox" defaultChecked className="h-5 w-5 accent-[#159c69]" />
          </label>
        </section>
      </div>
    </div>
  );
}