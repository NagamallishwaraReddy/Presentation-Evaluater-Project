import { useNavigate } from "react-router-dom";
import {
  FileText,
  Play,
  Clock,
  Layers,
  CheckCircle2,
} from "lucide-react";

import { evaluationData } from "../../data/evaluationData";

function Evaluation() {
  const navigate = useNavigate();

  const handleStartEvaluation = () => {
    navigate("/evaluation/progress");
  };

  return (
    <div className="min-h-screen bg-green-50 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-lg bg-green-100 p-2">
              <CheckCircle2
                size={20}
                className="text-green-600"
              />
            </div>

            <span className="text-sm font-bold tracking-wide text-green-600">
              AI EVALUATION
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Evaluate Your Presentation
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Get AI-powered insights about your presentation,
            communication, delivery and overall performance.
          </p>
        </div>

        {/* Main Presentation Card */}
        <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm">

          {/* Green Top Section */}
          <div className="border-b border-green-100 bg-green-50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-600">
                  <FileText
                    size={28}
                    className="text-white"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {evaluationData.presentation.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {evaluationData.presentation.fileName}
                  </p>
                </div>

              </div>

              <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                Ready for Evaluation
              </span>

            </div>
          </div>

          <div className="p-6">

            {/* File Information */}
            <div className="grid gap-4 sm:grid-cols-3">

              <div className="rounded-xl border border-green-100 bg-green-50/50 p-5">
                <FileText
                  size={22}
                  className="text-green-600"
                />

                <p className="mt-3 text-sm text-slate-500">
                  File Type
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {evaluationData.presentation.fileType}
                </p>
              </div>

              <div className="rounded-xl border border-green-100 bg-green-50/50 p-5">
                <Layers
                  size={22}
                  className="text-green-600"
                />

                <p className="mt-3 text-sm text-slate-500">
                  Total Slides
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {evaluationData.presentation.slides}
                </p>
              </div>

              <div className="rounded-xl border border-green-100 bg-green-50/50 p-5">
                <Clock
                  size={22}
                  className="text-green-600"
                />

                <p className="mt-3 text-sm text-slate-500">
                  Expected Time
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  5–10 minutes
                </p>
              </div>

            </div>

            {/* Evaluation Categories */}
            <div className="mt-8">

              <h3 className="text-xl font-bold text-slate-900">
                What will be evaluated?
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Our AI evaluation will analyze the following areas.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                {[
                  "Content Quality",
                  "Presentation Delivery",
                  "Language & Grammar",
                  "Audience Engagement",
                  "Confidence",
                  "Speech Patterns",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-green-100 bg-white p-4 transition hover:border-green-300 hover:bg-green-50"
                  >
                    <CheckCircle2
                      size={20}
                      className="shrink-0 text-green-600"
                    />

                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>

                ))}

              </div>

            </div>

            {/* Start Evaluation */}
            <div className="mt-8 border-t border-slate-100 pt-6">

              <button
                onClick={handleStartEvaluation}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-[0.99] sm:w-auto"
              >
                <Play size={20} />
                Start Evaluation
              </button>

              <p className="mt-3 text-xs text-slate-400">
                The evaluation may take a few moments to complete.
              </p>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Evaluation;