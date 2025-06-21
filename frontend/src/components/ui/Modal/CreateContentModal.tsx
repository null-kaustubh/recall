import { useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import Button from "../Button";
import Badge from "../Badge";
import { BACKEND_URL } from "../../../config";
import axios from "axios";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  link: string;
  notes?: string;
  tags?: string[];
}

export default function CreateContentModal(props: CreateContentModalProps) {
  const contentRef = useRef(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    link: "",
    notes: "",
    tags: [],
  });
  const [currentTag, setCurrentTag] = useState<string>("");

  // handling cancel button and outside clicks
  const resetFormData = () => {
    setFormData({
      title: "",
      link: "",
      notes: "",
      tags: [],
    });
    setCurrentTag("");
  };

  const handleClose = () => {
    resetFormData();
    props.onClose();
  };

  // handling clicks outside the modal
  useClickOutside(contentRef, handleClose);
  if (!props.open) return null;

  const addTag = (tagText) => {
    const trimmedTag = tagText.trim();
    const currentTags = formData.tags || [];
    if (trimmedTag && !currentTags.includes(trimmedTag)) {
      handleInputChange("tags", [...currentTags, trimmedTag]);
    }
    setCurrentTag("");
  };

  const removeTag = (indexToRemove: number) => {
    const currentTags = formData.tags || [];
    const updatedTags = currentTags.filter(
      (_, index) => index !== indexToRemove
    );
    handleInputChange("tags", updatedTags);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      addTag(currentTag);
    } else if (
      e.key === "Backspace" &&
      currentTag === "" &&
      (formData.tags?.length || 0) > 0
    ) {
      // Remove last tag when backspace is pressed on empty input
      removeTag((formData.tags?.length || 1) - 1);
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addContent = async (e: React.FormEvent) => {
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
          <form onSubmit={addContent} className="space-y-4">
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
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full px-3 py-1.5 pr-10 bg-neutral-800 border border-neutral-700 rounded-md text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Display existing tags as badges */}
            {(formData.tags?.length || 0) > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags?.map((tag, index) => (
                  <Badge
                    variants="input"
                    tag={tag}
                    onClick={() => removeTag(index)}
                  />
                ))}
              </div>
            )}

            <p className="text-xs text-neutral-400 mt-1">
              Press spacebar or enter to add tags. Click x to remove.
            </p>

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
                  onChange={(e) => handleInputChange("link", e.target.value)}
                  className="w-full px-3 py-1.5 pr-10 bg-neutral-800 border border-neutral-700 rounded-md text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between gap-2">
              <div onClick={props.onClose} className="cursor-pointer mt-2">
                <Button
                  variants="secondary"
                  text="Cancel"
                  className="w-40"
                  onClick={resetFormData}
                />
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
