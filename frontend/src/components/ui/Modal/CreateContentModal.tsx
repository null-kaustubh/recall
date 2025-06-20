import { useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import Button from "../Button";
import { RxCross2 } from "react-icons/rx";
import Badge from "../Badge";
import { BACKEND_URL } from "../../../config";
import axios from "axios";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateContentModal(props: CreateContentModalProps) {
  const contentRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    notes: "",
    tags: [],
  });
  useClickOutside(contentRef, props.onClose);

  if (!props.open) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-[rgba(24,24,24,0.8)] backdrop-blur-[1px] flex justify-center items-center z-50">
      <div className="flex flex-col justify-center">
        <div
          ref={contentRef}
          className="w-130 bg-neutral-100 text-neutral-900 dark:bg-neutral-850 dark:text-neutral-50 opacity-100 rounded-md flex flex-col px-6 pb-6"
        >
          <div className="text-center font-bold text-2xl mt-8 mb-4">
            Create a{" "}
            <span className="bg-gradient-to-tr from-[#FFC300] via-[#FFD700] to-[#FFFACD] bg-clip-text text-transparent">
              Recall
            </span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Field */}
            <div className="space-y-1">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-neutral-200"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="React.js useful tips"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-md text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Notes Field */}
            <div className="space-y-1">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-neutral-200"
              >
                Notes
              </label>
              <div className="relative">
                <input
                  id="notes"
                  type="text"
                  placeholder="react.js context api tips from john doe (Google)"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="w-full px-3 py-1.5 pr-10 bg-neutral-800 border border-neutral-700 rounded-md text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Tags Field */}
            <div className="space-y-1">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-neutral-200"
              >
                Tags
              </label>
              <div className="relative">
                <input
                  id="tags"
                  type="text"
                  placeholder="productivity"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  className="w-full px-3 py-1.5 pr-10 bg-neutral-800 border border-neutral-700 rounded-md text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Links Field */}
            <div className="space-y-1">
              <label
                htmlFor="links"
                className="block text-sm font-medium text-neutral-200"
              >
                Link
              </label>
              <div className="relative">
                <input
                  id="links"
                  type="text"
                  placeholder="https://johndoe.com"
                  value={formData.link}
                  onChange={(e) => handleInputChange("links", e.target.value)}
                  className="w-full px-3 py-1.5 pr-10 bg-neutral-800 border border-neutral-700 rounded-md text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between gap-2">
              <div onClick={props.onClose} className="cursor-pointer mt-2">
                <Button variants="secondary" text="Cancel" className="w-40" />
              </div>
              <div className="mt-2 w-full">
                <Button variants="submit" text="Submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
