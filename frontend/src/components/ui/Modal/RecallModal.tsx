import { useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import useClickOutside from "../../../hooks/useClickOutside";

export default function RecallModal({ open, onClose }) {
  const modalRef = useRef(null);
  useClickOutside(modalRef, onClose);

  if (!open) return null;

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-[rgba(24,24,24,0.7)] flex justify-center items-center z-50">
      <div className="flex flex-col justify-center">
        <div
          ref={modalRef}
          className="bg-white text-black opacity-100 p-4 rounded-md flex items-center justify-between w-100"
        >
          <div>Title</div>
          <div onClick={onClose} className="cursor-pointer">
            <RxCross2 />
          </div>
        </div>
      </div>
    </div>
  );
}
