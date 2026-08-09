import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

import { evaluationData } from "../../data/evaluationData";

function ScoreDetails() {
  const navigate = useNavigate();

  const scores = evaluationData.scores;

  const scoreItems = [
    {
      name: "Content",
      score: scores.content,
    },
    {
      name: "Delivery",
      score: scores.delivery,
    },
    {
      name: "Language",
      score: scores.language,
    },
    {
      name: "Engagement",
      score: scores.engagement,
    },
    {
      name: "Confidence",
      score: scores.confidence,
    },
  ];

  return (
    <div className="min-h-screen bg-green-50 p-4 sm:p-6">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-bold tracking-wide text-green-600">
            EVALUATION COMPLETE
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Your Presentation Score
          </h1>

          <p className="mt-2 text-slate-500">
            Here is the AI-generated evaluation of your presentation.
          </p>

        </div>

        {/* Main Score Grid */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Overall Score */}
          <div className="rounded-2xl bg-green-600 p-7 text-white shadow-sm">

            <div className="flex items-center justify-between">

              <Award size={42} />

              <div className="rounded-full bg-white/20 px-3 py-1 text-sm">
                Excellent
              </div>

            </div>

            <p className="mt-8 text-green-100">
              Overall Score
            </p>

            <div className="mt-2 flex items-end gap-2">

              <span className="text-6xl font-bold">
                {evaluationData.overallScore}
              </span>

              <span className="mb-2 text-green-100">
                / 100
              </span>

            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-green-100">
              <TrendingUp size={18} />
              Strong overall performance
            </div>

          </div>

          {/* Score Breakdown */}
          <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm lg:col-span-2">

            <h2 className="text-xl font-bold text-slate-900">
              Score Breakdown
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Performance across different evaluation categories.
            </p>

            <div className="mt-6 space-y-5">

              {scoreItems.map(({ name, score }) => (

                <div key={name}>

                  <div className="mb-2 flex items-center justify-between">

                    <span className="font-medium text-slate-700">
                      {name}
                    </span>

                    <span className="font-bold text-green-600">
                      {score}/100
                    </span>

                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-green-100">

                    <div
                      className="h-full rounded-full bg-green-600 transition-all"
                      style={{
                        width: `${score}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Strengths */}
        <div className="mt-6 rounded-2xl border border-green-100 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Key Strengths
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Things you did particularly well.
              </p>
            </div>

            <div className="hidden rounded-full bg-green-100 p-3 sm:block">
              <CheckCircle
                size={22}
                className="text-green-600"
              />
            </div>

          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            {evaluationData.strengths.map((item) => (

              <div
                key={item}
                className="flex gap-3 rounded-xl border border-green-100 bg-green-50 p-4"
              >

                <CheckCircle
                  size={20}
                  className="mt-0.5 shrink-0 text-green-600"
                />

                <span className="text-sm text-slate-700">
                  {item}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/evaluation/feedback")}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-green-700 sm:w-auto"
        >
          View Detailed Feedback
          <ArrowRight size={20} />
        </button>

      </div>
    </div>
  );
}

export default ScoreDetails;