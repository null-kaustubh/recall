import Button from "../components/ui/Button";
import { RxPlus, RxShare1, RxSun, RxHamburgerMenu } from "react-icons/rx";
import Card from "../components/ui/Card";
import RecallModal from "../components/ui/Modal/RecallModal";
import { useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import CreateContentModal from "../components/ui/Modal/CreateContentModal";
import useContent from "../hooks/useContent";
import type { ContentItem } from "../components/ui/default";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(
    null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { contents, noContentMessage, loading, refreshContents } = useContent();

  const handleCardClick = (content: ContentItem) => {
    console.log("Card clicked with ID:", content._id);
    setSelectedContent(content);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="lg:ml-72">
        <header className="bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10 border-b border-neutral-800">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-white"
            >
              <RxHamburgerMenu size={24} />
            </button>
            <div className="hidden lg:block" />

            <div className="flex items-center gap-2">
              <Button
                variants="primary"
                text="Add recall"
                startIcon={<RxPlus />}
                onClick={() => setContentModalOpen(true)}
              />
              <Button variants="icon" icon={<RxShare1 />} />
              <Button variants="icon" icon={<RxSun />} />
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
            <div className="text-center text-neutral-400 py-8">
              <p>{noContentMessage || "No content available"}</p>
              <Button
                variants="secondary"
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
