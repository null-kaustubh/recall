import Button from "../components/ui/Button";
import { RxPlus, RxShare1, RxSun } from "react-icons/rx";
import Card from "../components/ui/Card";
import RecallModal from "../components/ui/Modal/RecallModal";
import { useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import CreateContentModal from "../components/ui/Modal/CreateContentModal";
import useContent from "../hooks/useContent";

interface ContentItem {
  id: string;
  title: string;
  note: string;
  tags?: string[];
  link: string;
}

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(
    null
  );

  const { contents, noContentMessage, loading, refreshContents } = useContent();

  const handleCardClick = (content: ContentItem) => {
    setSelectedContent(content);
    setModalOpen(true);
  };

  return (
    <div>
      <Sidebar />
      <div className="ml-72 mr-4 my-2 bg-neutral-900">
        <div className="ml-4 mt-4">
          <div className="flex gap-2 my-4">
            <Button
              variants="primary"
              text="Add recall"
              startIcon={<RxPlus />}
              onClick={() => setContentModalOpen(true)}
            />
            <Button variants="icon" icon={<RxShare1 />} />
            <Button variants="icon" icon={<RxSun />} />
          </div>
          <div className="my-4">
            {loading ? (
              <div>Loading...</div>
            ) : contents.length > 0 ? (
              contents.map((c) => {
                return (
                  <div>
                    <Card
                      key={c.id}
                      title={c.title}
                      onClick={() => handleCardClick(c)}
                    />
                  </div>
                );
              })
            ) : (
              <div className="text-center text-neutral-400 py-8">
                <p>{noContentMessage || "No content available"}</p>
                <Button
                  variants="primary"
                  onClick={() => setContentModalOpen(true)}
                  className="mt-4"
                  text="Add Your First Recall"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <RecallModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(!modalOpen);
        }}
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
