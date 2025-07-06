import Button from "../components/ui/Button";
import { RxPlus, RxShare1, RxSun, RxMoon } from "react-icons/rx";
import Card from "../components/ui/Card";
import RecallModal from "../components/ui/Modal/RecallModal";
import { useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import CreateContentModal from "../components/ui/Modal/CreateContentModal";
import useContent from "../hooks/useContent";
import type { ContentItem } from "../components/ui/default";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useTheme } from "../contexts/ThemeContext";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(
    null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const { contents, noContentMessage, loading, refreshContents } = useContent();

  const handleCardClick = (content: ContentItem) => {
    console.log("Card clicked with ID:", content._id);
    setSelectedContent(content);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="lg:ml-72">
        <header className="bg-white dark:bg-neutral-900 sticky top-0 z-10 border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            {/* Left: Title and Subtitle */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-medium text-neutral-900 dark:text-white leading-tight">
                My Recalls
              </h1>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                Store and organize your important links
              </span>
            </div>
            {/* Right: Search, Add Link, Share, Theme Toggle */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 max-w-xs">
                <input
                  type="text"
                  placeholder="Search links..."
                  className="w-full pl-10 pr-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 transition"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setContentModalOpen(true)}
                className={`ml-1 rounded-lg px-4 py-2 h-10 font-semibold border-none shadow flex items-center gap-2 transition-all duration-200 hover:shadow-md transform hover:scale-105
                  ${
                    theme === "dark"
                      ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-900"
                      : "bg-neutral-900 hover:bg-neutral-800 text-white"
                  }
                `}
              >
                <RxPlus className="w-5 h-5" />
                Add recall
              </button>
              <Button variants="icon" icon={<RxShare1 />} />
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="h-9 w-9 flex items-center justify-center rounded text-neutral-700 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition bg-transparent border-none"
                type="button"
                style={{ background: "none", border: "none" }}
              >
                {theme === "light" ? <RxMoon size={18} /> : <RxSun size={18} />}
              </button>
            </div>
          </div>
        </header>

        <main className="p-4">
          {loading ? (
            <LoadingSpinner />
          ) : contents.length > 0 ? (
            contents.map((c) => (
              <Card
                key={c._id}
                id={c._id}
                title={c.title}
                author=""
                createdAt={c.createdAt}
                url={c.link}
                tags={c.tags}
                onClick={() => handleCardClick(c)}
              />
            ))
          ) : (
            <div className="text-center text-neutral-600 dark:text-neutral-400 py-8">
              <p>{noContentMessage || "No content available"}</p>
              <Button
                variants="primary"
                onClick={() => setContentModalOpen(true)}
                className="mt-4"
                text="get started"
              />
            </div>
          )}
        </main>
      </div>

      <RecallModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(!modalOpen);
        }}
        onDelete={() => {
          refreshContents();
          setModalOpen(false);
        }}
        id={selectedContent?._id || ""}
        title={selectedContent?.title || ""}
        note={selectedContent?.note || ""}
        tags={selectedContent?.tags || []}
        link={selectedContent?.link || ""}
      />
      <CreateContentModal
        open={contentModalOpen}
        onClose={() => setContentModalOpen(!contentModalOpen)}
        onContentAdded={() => refreshContents()}
      />
    </div>
  );
}

export default Dashboard;
