import Button from "../components/ui/Button";
import { RxPlus, RxShare1, RxSun } from "react-icons/rx";
import Card from "../components/ui/Card";
import RecallModal from "../components/ui/Modal/RecallModal";
import { useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import CreateContentModal from "../components/ui/Modal/CreateContentModal";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [contentModalOpen, setContentModalOpen] = useState(false);

  return (
    <div>
      <Sidebar />
      <div className="ml-72 mr-4 my-2 bg-neutral-900">
        <RecallModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(!modalOpen);
          }}
          title="Hello first recall"
          notes="Random ass note"
          tags={["string1", "string2"]}
          url="https://randomurl.com"
        />
        <CreateContentModal
          open={contentModalOpen}
          onClose={() => setContentModalOpen(!contentModalOpen)}
        />
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
            <Card
              title="Hello first recall"
              author={"postAuthor"}
              date="2d"
              onClick={() => {
                setModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
