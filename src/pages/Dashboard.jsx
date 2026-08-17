import React from "react";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { PresentationLogo } from "../components/icons/PresentationLogo";
import { ThemeToggle } from "../components/ThemeToggle";
import {
  LogoutIcon,
  UserIcon,
} from "../components/icons/Icons";

import ScoreCard from "../components/ScoreCard";
import QuickActions from "../components/QuickActions";
import Insights from "../components/Insights";
import { useDashboard } from "../context/DashboardContext";


/* =========================================================
   DASHBOARD SCORE DATA
   ========================================================= */

const scores = [
  {
    title: "Overall Score",
    score: 86,
    label: "Very Good",
    change: "8% from last evaluation",
    color: "#159c69",
    icon: "ClipboardCheck",
  },
  {
    title: "Content Score",
    score: 88,
    label: "Great",
    change: "10%",
    color: "#159c69",
    icon: "FileText",
  },
  {
    title: "Delivery Score",
    score: 78,
    label: "Good",
    change: "5%",
    color: "#e49b31",
    icon: "Mic2",
  },
  {
    title: "Language Score",
    score: 82,
    label: "Very Good",
    change: "7%",
    color: "#3d72c4",
    icon: "Globe2",
  },
  {
    title: "Confidence Score",
    score: 90,
    label: "Excellent",
    change: "12%",
    color: "#7650b9",
    icon: "ShieldCheck",
  },
];


/* =========================================================
   DASHBOARD
   ========================================================= */

export const Dashboard = ({ onNavigate }) => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const { filteredPresentations = [] } = useDashboard();


  /* =======================================================
     NAVIGATION
     ======================================================= */

  const handleNavigate = (page) => {
    if (onNavigate) {
      onNavigate(page);
      return;
    }

    const routes = {
      home: "/",
      login: "/login",
      signup: "/signup",
      profile: "/profile",
      dashboard: "/dashboard",
      "forgot-password": "/forgot-password",
    };

    navigate(routes[page] || "/");
  };


  /* =======================================================
     LOGOUT
     ======================================================= */

  const handleLogout = () => {
    logout();
    handleNavigate("home");
  };


  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--bg-app)",
        position: "relative",
      }}
    >

      {/* ===================================================
          AMBIENT BACKGROUND
         =================================================== */}

      <div className="ambient-glow-wrapper">
        <div className="ambient-glow-1" />
        <div className="ambient-glow-2" />
      </div>


      {/* ===================================================
          AUTHENTICATION HEADER
         =================================================== */}

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          padding: "1rem 2rem",

          backgroundColor: "var(--bg-glass)",
          backdropFilter: "blur(16px)",

          borderBottom: "1px solid var(--border-color)",
        }}
      >

        {/* Logo */}

        <div
          onClick={() => handleNavigate("home")}
          style={{
            cursor: "pointer",
          }}
        >
          <PresentationLogo
            size={36}
            showText={true}
          />
        </div>


        {/* Header Actions */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
          }}
        >

          <ThemeToggle />


          {/* Profile */}

          <button
            onClick={() => handleNavigate("profile")}
            className="btn-secondary"
            style={{
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <UserIcon size={16} />

            <span>
              Profile
            </span>
          </button>


          {/* Logout */}

          <button
            onClick={handleLogout}
            className="btn-secondary"
            title="Logout"
            style={{
              padding: "0.55rem 0.85rem",
              color: "var(--error)",
            }}
          >
            <LogoutIcon size={16} />
          </button>

        </div>

      </header>


      {/* ===================================================
          MAIN DASHBOARD
         =================================================== */}

      <main
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
        }}
      >

        <div className="mx-auto max-w-[1180px] p-6 xl:px-[34px] xl:py-[26px]">

          {/* =================================================
              DASHBOARD HEADER
             ================================================= */}

          <div className="mb-6 flex items-end justify-between gap-5">

            <div>

              <div className="mb-2 text-sm font-bold text-[#18865d]">
                Dashboard
              </div>

              <h1 className="mb-2 text-[29px] font-extrabold tracking-[-.6px]">
                Results Overview
              </h1>

              <p className="text-sm text-[#7c8795]">
                Detailed analysis of your presentation performance
              </p>

              {/* Logged-in user */}

              <p className="mt-2 text-xs text-[#8a94a2]">
                Logged in as{" "}
                <strong>
                  {user?.email || "user@example.com"}
                </strong>
              </p>

            </div>


            {/* Desktop Actions */}

            <div className="hidden gap-3 sm:flex">

              <button
                onClick={() =>
                  navigate("/recent-presentations")
                }
                className="h-[45px] rounded-lg border border-[#e6e9e8] bg-white px-5 text-sm font-semibold text-[#263246]"
              >
                View all
              </button>


              <button
                onClick={() => navigate("/home")}
                className="flex h-[45px] items-center gap-2 rounded-lg bg-[#119b64] px-5 text-sm font-bold text-white"
              >
                <Upload size={18} />

                New Evaluation
              </button>

            </div>

          </div>


          {/* =================================================
              SCORE CARDS
             ================================================= */}

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

            {scores.map((item) => (
              <ScoreCard
                key={item.title}
                {...item}
              />
            ))}

          </section>


          {/* =================================================
              QUICK ACTIONS + INSIGHTS
             ================================================= */}

          <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[1.7fr_.9fr]">

            <section className="panel min-h-[278px] p-5">

              <h2 className="text-[18px] font-bold">

                Welcome back,{" "}
                {user?.name || "User"}

                <span className="text-base">
                  👋
                </span>

              </h2>


              <p className="mt-1.5 text-[13px] text-[#7d8795]">
                Keep improving your presentation skills.
              </p>


              <QuickActions />

            </section>


            <Insights />

          </section>


          {/* =================================================
              RECENT PRESENTATIONS
             ================================================= */}

          <section className="panel mt-6 p-5">

            <div className="mb-4 flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold">
                  Recent Presentations
                </h2>

                <p className="mt-1 text-xs text-[#7d8795]">
                  Your latest presentation evaluations
                </p>

              </div>


              <button
                onClick={() =>
                  navigate("/recent-presentations")
                }
                className="text-sm font-bold text-[#159c69]"
              >
                View all →
              </button>

            </div>


            {/* Presentation list */}

            <div className="grid gap-2">

              {filteredPresentations
                .slice(0, 3)
                .map((presentation) => (

                  <div
                    key={presentation.id}
                    className="flex items-center justify-between rounded-lg border border-[#edf0f1] px-4 py-3"
                  >

                    <div>

                      <strong className="text-sm">
                        {presentation.title}
                      </strong>

                      <span className="ml-3 text-xs text-[#8a94a2]">
                        {presentation.date}
                      </span>

                    </div>


                    <span className="font-bold text-[#159c69]">

                      {presentation.score
                        ? `${presentation.score}/100`
                        : presentation.status}

                    </span>

                  </div>

                ))}


              {/* Empty state */}

              {filteredPresentations.length === 0 && (

                <div className="rounded-lg border border-dashed border-[#dfe5e2] p-6 text-center">

                  <p className="text-sm text-[#7d8795]">
                    No presentations available yet.
                  </p>


                  <button
                    onClick={() => navigate("/home")}
                    className="mt-3 rounded-lg bg-[#119b64] px-4 py-2 text-sm font-bold text-white"
                  >
                    Start New Evaluation
                  </button>

                </div>

              )}

            </div>

          </section>


          {/* =================================================
              MOBILE ACTIONS
             ================================================= */}

          <div className="mt-6 flex gap-3 sm:hidden">

            <button
              onClick={() =>
                navigate("/recent-presentations")
              }
              className="flex-1 rounded-lg border border-[#e6e9e8] bg-white px-4 py-3 text-sm font-semibold text-[#263246]"
            >
              View All
            </button>


            <button
              onClick={() => navigate("/home")}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#119b64] px-4 py-3 text-sm font-bold text-white"
            >
              <Upload size={17} />

              New Evaluation
            </button>

          </div>

        </div>

      </main>

    </div>
  );
};


export default Dashboard;