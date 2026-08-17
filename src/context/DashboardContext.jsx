import { createContext, useContext, useMemo, useState } from "react";

const DashboardContext = createContext(null);

const initialPresentations = [
  { id: 1, title: "AI in Education", date: "Aug 08, 2026", score: 88, status: "Excellent" },
  { id: 2, title: "Project Proposal", date: "Aug 06, 2026", score: 82, status: "Very Good" },
  { id: 3, title: "Quarterly Review", date: "Aug 02, 2026", score: 78, status: "Good" },
  { id: 4, title: "Product Demo", date: "Jul 28, 2026", score: 91, status: "Excellent" }
];

export function DashboardProvider({ children }) {
  const [presentations, setPresentations] = useState(initialPresentations);
  const [theme, setTheme] = useState("light");
  const [search, setSearch] = useState("");

  const filteredPresentations = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return presentations;
    return presentations.filter((p) =>
      `${p.title} ${p.status}`.toLowerCase().includes(q)
    );
  }, [presentations, search]);

  const addPresentation = (title = "New Presentation") => {
    const newItem = {
      id: Date.now(),
      title,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
      }),
      score: 0,
      status: "Pending"
    };
    setPresentations((items) => [newItem, ...items]);
  };

  return (
    <DashboardContext.Provider value={{
      presentations,
      filteredPresentations,
      theme,
      setTheme,
      search,
      setSearch,
      addPresentation
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const value = useContext(DashboardContext);
  if (!value) throw new Error("useDashboard must be used inside DashboardProvider");
  return value;
}