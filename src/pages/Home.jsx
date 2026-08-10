import { useState } from "react";
import { UploadCloud, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../context/DashboardContext";

export default function Home() {
  const navigate = useNavigate();
  const { addPresentation } = useDashboard();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    addPresentation(title || "New Presentation");
    setMessage("Presentation uploaded successfully. Evaluation is ready to review.");
  };

  return (
    <div className="mx-auto max-w-[980px] p-6 xl:px-[34px] xl:py-[30px]">
      <button onClick={() => navigate("/dashboard")} className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#159c69]">
        <ArrowLeft size={17}/> Back to Dashboard
      </button>

      <div className="panel p-8">
        <div className="mb-8">
          <div className="mb-2 text-sm font-bold text-[#18865d]">Home / Upload</div>
          <h1 className="text-3xl font-extrabold">Start a New Evaluation</h1>
          <p className="mt-2 text-sm text-[#7c8795]">Upload your presentation and continue with AI-assisted evaluation.</p>
        </div>

        <form onSubmit={submit} className="grid gap-5">
          <label className="grid gap-2 text-sm font-semibold">
            Presentation title
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. AI in Education" className="h-12 rounded-lg border border-[#dfe5e3] px-4 outline-none focus:border-[#159c69]" />
          </label>

          <label className="grid min-h-[230px] cursor-pointer place-items-center rounded-xl border-2 border-dashed border-[#cfe6dc] bg-[#f6fbf8] p-8 text-center">
            <input type="file" className="hidden" accept=".ppt,.pptx,.pdf" />
            <div>
              <UploadCloud size={48} className="mx-auto mb-4 text-[#159c69]" strokeWidth={1.5} />
              <strong className="text-lg">Drop your presentation here</strong>
              <p className="mt-2 text-sm text-[#7d8795]">PPT, PPTX or PDF</p>
            </div>
          </label>

          <button className="h-12 rounded-lg bg-[#119b64] font-bold text-white hover:bg-[#0c8b59]">
            Upload & Start Evaluation
          </button>

          {message && <div className="rounded-lg bg-[#e9f7f0] p-4 text-sm font-semibold text-[#378764]">{message}</div>}
        </form>
      </div>
    </div>
  );
}