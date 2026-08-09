import {
  AlertCircle,
  CheckCircle,
  Lightbulb,
  MessageSquare,
} from "lucide-react";

import { evaluationData } from "../../data/evaluationData";

function Feedback() {
  return (
    <div className="min-h-screen bg-green-50 p-4 sm:p-6">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-bold tracking-wide text-green-600">
            AI FEEDBACK
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Detailed Feedback
          </h1>

          <p className="mt-2 text-slate-500">
            Understand what you did well and how you can improve.
          </p>

        </div>

        {/* AI Summary */}
        <div className="overflow-hidden rounded-2xl bg-green-600 p-6 text-white shadow-sm sm:p-8">

          <div className="flex gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
              <Lightbulb size={26} />
            </div>

            <div>

              <h2 className="text-xl font-bold">
                AI Summary
              </h2>

              <p className="mt-3 max-w-4xl leading-7 text-green-50">
                {evaluationData.feedback}
              </p>

            </div>

          </div>

        </div>

        {/* Strengths and Improvements */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {/* Strengths */}
          <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-green-100 p-3">
                <CheckCircle
                  size={22}
                  className="text-green-600"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Strengths
                </h2>

                <p className="text-sm text-slate-500">
                  What you did well
                </p>
              </div>

            </div>

            <div className="mt-6 space-y-3">

              {evaluationData.strengths.map((item) => (

                <div
                  key={item}
                  className="flex gap-3 rounded-xl border border-green-100 bg-green-50 p-4"
                >

                  <CheckCircle
                    size={20}
                    className="mt-0.5 shrink-0 text-green-600"
                  />

                  <span className="text-sm leading-6 text-slate-700">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* Improvements */}
          <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-amber-100 p-3">
                <AlertCircle
                  size={22}
                  className="text-amber-600"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Areas to Improve
                </h2>

                <p className="text-sm text-slate-500">
                  Recommendations for improvement
                </p>
              </div>

            </div>

            <div className="mt-6 space-y-3">

              {evaluationData.improvements.map((item) => (

                <div
                  key={item}
                  className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4"
                >

                  <AlertCircle
                    size={20}
                    className="mt-0.5 shrink-0 text-amber-600"
                  />

                  <span className="text-sm leading-6 text-slate-700">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Communication Metrics */}
        <div className="mt-6 rounded-2xl border border-green-100 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-green-100 p-3">
              <MessageSquare
                size={22}
                className="text-green-600"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Communication Metrics
              </h2>

              <p className="text-sm text-slate-500">
                Speech and presentation delivery statistics.
              </p>
            </div>

          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            {/* Speaking Speed */}
            <div className="rounded-xl border border-green-100 bg-green-50 p-5">

              <p className="text-sm text-slate-500">
                Speaking Speed
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {evaluationData.metrics.wordsPerMinute}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                words / minute
              </p>

            </div>

            {/* Filler Words */}
            <div className="rounded-xl border border-green-100 bg-green-50 p-5">

              <p className="text-sm text-slate-500">
                Filler Words
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {evaluationData.metrics.fillerWords}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                detected
              </p>

            </div>

            {/* Duration */}
            <div className="rounded-xl border border-green-100 bg-green-50 p-5">

              <p className="text-sm text-slate-500">
                Presentation Duration
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {evaluationData.metrics.duration}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                total duration
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Feedback;