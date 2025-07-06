import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { RxSun, RxMoon } from "react-icons/rx";

const BTN_NAV =
  "h-9 px-4 rounded-md font-semibold text-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 dark:focus:ring-neutral-700";
const BTN_NAV_PRIMARY = `${BTN_NAV} bg-neutral-900 text-white hover:bg-neutral-800`;
const BTN_NAV_PRIMARY_DARK = `${BTN_NAV} bg-neutral-800 text-neutral-50 hover:bg-neutral-700 hover:text-white`;
const BTN_NAV_SECONDARY = `${BTN_NAV} bg-transparent dark:bg-transparent text-neutral-800 dark:text-white border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800`;

const BTN_HERO =
  "h-11 px-6 rounded-lg font-semibold text-base transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 dark:focus:ring-neutral-700";
const BTN_HERO_PRIMARY = `${BTN_HERO} bg-neutral-900 text-white hover:bg-neutral-800`;
const BTN_HERO_PRIMARY_DARK = `${BTN_HERO} bg-neutral-800 text-neutral-50 hover:bg-neutral-700 hover:text-white`;
const BTN_HERO_SECONDARY = `${BTN_HERO} bg-transparent dark:bg-transparent text-neutral-800 dark:text-white border border-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:border-neutral-700`;

export default function Landing() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Subtle SVG grid in both light and dark mode */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-60"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="grid-light"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          </pattern>
          <pattern
            id="grid-dark"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#23272e"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={theme === "dark" ? "url(#grid-dark)" : "url(#grid-light)"}
        />
      </svg>
      {/* Top Nav */}
      <nav className="w-full flex items-center justify-center bg-transparent pt-6 sm:pt-8 pb-2 z-10 px-4">
        <div className="flex w-full max-w-2xl items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 select-none">
            <span className="inline-flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white dark:bg-neutral-800 shadow ring-2 ring-neutral-200 dark:ring-neutral-500">
              <img
                src="/logo.jpg"
                alt="Recall Logo"
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover shadow-sm"
                style={{ objectFit: "cover" }}
              />
            </span>
            <span className="font-bold text-2xl sm:text-3xl text-neutral-800 dark:text-white tracking-tight">
              Recall
            </span>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={toggleTheme}
              className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded text-neutral-700 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
              aria-label="Toggle theme"
              style={{ background: "none", border: "none" }}
            >
              {theme === "light" ? (
                <RxMoon size={16} className="sm:w-[18px] sm:h-[18px]" />
              ) : (
                <RxSun size={16} className="sm:w-[18px] sm:h-[18px]" />
              )}
            </button>
            <button
              onClick={() => navigate("/auth?mode=signin")}
              className={`${BTN_NAV_SECONDARY} h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm`}
              style={{ minWidth: "70px" }}
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/auth?mode=signup")}
              className={`${
                theme === "dark" ? BTN_NAV_PRIMARY_DARK : BTN_NAV_PRIMARY
              } h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm`}
              style={{ minWidth: "70px" }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center w-full z-10">
        <section className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center px-4 pt-8 pb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-4 leading-tight">
            Everything you need.
            <br />
            Before you forget.
          </h1>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 mb-7 font-normal max-w-xl mx-auto">
            Recall is your modern, secure link manager. Save, organize, and
            recall your most important links—fast, simple, and beautiful.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-1">
            <button
              onClick={() => navigate("/auth?mode=signup")}
              className={
                theme === "dark" ? BTN_HERO_PRIMARY_DARK : BTN_HERO_PRIMARY
              }
              style={{ minWidth: 120 }}
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/auth?mode=signin")}
              className={BTN_HERO_SECONDARY}
              style={{ minWidth: 120 }}
            >
              Sign In
            </button>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="w-full text-center py-4 text-neutral-400 text-xs bg-transparent z-10">
        &copy; {new Date().getFullYear()} Recall. All rights reserved.
      </footer>
    </div>
  );
}
