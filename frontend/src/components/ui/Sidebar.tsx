import { RxCross1 } from "react-icons/rx";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div
      className={`fixed min-h-screen bg-neutral-900 border-r border-neutral-800 w-72 left-0 top-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-300 ease-in-out z-20`}
    >
      <div className="flex items-center justify-between p-4 lg:justify-start">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="w-full h-full object-cover scale-150 rotate-180 translate-y-0.5"
            />
          </div>
          <div className="ml-4">
            <h1 className="font-semibold text-3xl">Recall</h1>
            <p className="font-extralight text-sm">your second brain</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-neutral-400 hover:text-white"
        >
          <RxCross1 size={24} />
        </button>
      </div>
    </div>
  );
}
