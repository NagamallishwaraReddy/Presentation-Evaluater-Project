import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Evaluation from "./pages/evaluation/Evaluation";
import EvaluationProgress from "./pages/evaluation/EvaluationProgress";
import ScoreDetails from "./pages/evaluation/ScoreDetails";
import Feedback from "./pages/evaluation/Feedback";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Default route */}
        <Route
          path="/"
          element={
            <Navigate
              to="/evaluation"
              replace
            />
          }
        />

        {/* AI Evaluation */}
        <Route
          path="/evaluation"
          element={<Evaluation />}
        />

        <Route
          path="/evaluation/progress"
          element={<EvaluationProgress />}
        />

        <Route
          path="/evaluation/score"
          element={<ScoreDetails />}
        />

        <Route
          path="/evaluation/feedback"
          element={<Feedback />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;