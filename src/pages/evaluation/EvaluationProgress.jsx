import { useEffect, useState } from "react";
import {
  CheckCircle,
  Circle,
  Loader2,
  Brain,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function EvaluationProgress() {
  const navigate = useNavigate();

  const steps = [
    "Extracting slide content",
    "Analyzing presentation structure",
    "Processing speech",
    "Checking language and grammar",
    "Evaluating delivery",
    "Generating AI feedback",
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((previous) => {

        if (previous >= steps.length - 1) {
          clearInterval(timer);
          return previous;
        }

        return previous + 1;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {

    if (currentStep === steps.length - 1) {

      const timer = setTimeout(() => {
        navigate("/evaluation/score");
      }, 1800);

      return () => clearTimeout(timer);
    }

  }, [currentStep, navigate, steps.length]);

  const progress = Math.round(
    ((currentStep + 1) / steps.length) * 100
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 p-4 sm:p-6">

      <div className="w-full max-w-2xl rounded-2xl border border-green-100 bg-white p-6 shadow-sm sm:p-8">

        {/* AI Icon */}
        <div className="flex justify-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

            <Brain
              size={38}
              className="text-green-600"
            />

          </div>

        </div>

        {/* Heading */}
        <div className="mt-6 text-center">

          <p className="text-sm font-bold tracking-wide text-green-600">
            AI ANALYSIS IN PROGRESS
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Evaluating Your Presentation
          </h1>

          <p className="mt-2 text-slate-500">
            Please wait while our AI analyzes your presentation.
          </p>

        </div>

        {/* Percentage */}
        <div className="mt-8 flex justify-center">

          <div className="flex h-28 w-28 items-center justify-center rounded-full border-8 border-green-100">

            <span className="text-2xl font-bold text-green-600">
              {progress}%
            </span>

          </div>

        </div>

        {/* Progress Bar */}
        <div className="mt-8">

          <div className="mb-2 flex justify-between text-sm">

            <span className="font-medium text-slate-600">
              Analysis progress
            </span>

            <span className="font-semibold text-green-600">
              {progress}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-green-100">

            <div
              className="h-full rounded-full bg-green-600 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* Steps */}
        <div className="mt-8 space-y-4">

          {steps.map((step, index) => {

            const completed = index < currentStep;
            const active = index === currentStep;

            return (
              <div
                key={step}
                className="flex items-center gap-3"
              >

                {completed ? (

                  <CheckCircle
                    size={22}
                    className="shrink-0 text-green-600"
                  />

                ) : active ? (

                  <Loader2
                    size={22}
                    className="shrink-0 animate-spin text-green-600"
                  />

                ) : (

                  <Circle
                    size={22}
                    className="shrink-0 text-slate-300"
                  />

                )}

                <span
                  className={
                    completed || active
                      ? "font-medium text-slate-800"
                      : "text-slate-400"
                  }
                >
                  {step}
                </span>

              </div>
            );
          })}

        </div>

        <div className="mt-8 rounded-xl bg-green-50 p-4 text-center text-sm text-green-700">
          Please don't close this page while the evaluation is in progress.
        </div>

      </div>
    </div>
  );
}

export default EvaluationProgress;