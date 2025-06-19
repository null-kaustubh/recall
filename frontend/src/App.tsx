import Button from "./components/ui/Button";
import { RxPlus, RxShare1 } from "react-icons/rx";
import Card from "./components/ui/Card";
import RecallModal from "./components/ui/Modal/RecallModal";
import { useState } from "react";
import Sidebar from "./components/ui/Sidebar";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Sidebar />
      <div className="ml-72 mr-4 my-2 bg-neutral-900">
        <RecallModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(!modalOpen);
          }}
        />
        <div className="ml-4 mt-4">
          <div className="flex gap-2 my-4">
            <Button
              variants="primary"
              text="Add recall"
              startIcon={<RxPlus />}
            />
            <Button variants="secondary" text="Add recall" />
            <Button variants="icon" icon={<RxShare1 />} />
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

export default App;
