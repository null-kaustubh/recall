import { useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import Button from "../Button";
import Badge from "../Badge";
import { BACKEND_URL } from "../../../config";
import axios from "axios";
import type { ContentItem } from "../default";
import { RxCross2 } from "react-icons/rx";
import TextareaAutosize from "react-textarea-autosize";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
  onContentAdded: (newContent: ContentItem) => void;
}

interface FormData {
  title: string;
  link: string;
  note?: string;
  tags?: string[];
}

export default function CreateContentModal(props: CreateContentModalProps) {
  const contentRef = useRef(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    link: "",
    note: "",
    tags: [],
  });
  const [currentTag, setCurrentTag] = useState<string>("");

  // handling cancel button and outside clicks
  const resetFormData = () => {
    setFormData({
      title: "",
      link: "",
      note: "",
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
    try {
      const response = await axios.post(
        `${BACKEND_URL}api/content`,
        {
          title: formData.title,
          link: formData.link,
          note: formData.note,
          tags: formData.tags,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      props.onContentAdded(response.data);
      handleClose();
    } catch (error) {
      console.error("Error adding content:", error);
      // Handle error appropriately
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div
        ref={contentRef}
        className="bg-neutral-850 text-neutral-50 rounded-lg shadow-xl w-full max-w-lg flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-700">
          <h2 className="font-semibold text-xl">
            Create a{" "}
            <span className="bg-gradient-to-tr from-[#FFC300] via-[#FFD700] to-[#FFFACD] bg-clip-text text-transparent">
              Recall
            </span>
          </h2>
          <Button onClick={handleClose} variants="icon" icon={<RxCross2 />} />
        </div>

        <form onSubmit={addContent}>
          <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
            {/* Title Field */}
            <div className="space-y-1">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-neutral-300"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g., React.js useful tips"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-md text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Link Field */}
            <div className="space-y-1">
              <label
                htmlFor="link"
                className="block text-sm font-medium text-neutral-300"
              >
                Link
              </label>
              <input
                id="link"
                type="url"
                placeholder="https://example.com"
                value={formData.link}
                onChange={(e) => handleInputChange("link", e.target.value)}
                className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-md text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Notes Field */}
            <div className="space-y-1">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-neutral-300"
              >
                Notes (Optional)
              </label>
              <TextareaAutosize
                id="notes"
                placeholder="e.g., Context API tips from..."
                value={formData.note}
                onChange={(e) => handleInputChange("note", e.target.value)}
                minRows={3}
                className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-md text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Tags Field */}
            <div className="space-y-1">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-neutral-300"
              >
                Tags (Optional)
              </label>
              <div className="relative">
                <input
                  id="tags"
                  type="text"
                  placeholder="Type and press Enter to add tags"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-md text-white text-sm font-light placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Display existing tags as badges */}
            {(formData.tags?.length || 0) > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.tags?.map((tag, index) => (
                  <Badge
                    key={`${tag}-${index}`}
                    variants="input"
                    tag={tag}
                    onClick={() => removeTag(index)}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-end gap-2 p-4 border-t border-neutral-700 bg-neutral-800 rounded-b-lg">
            <div className="w-1/2 pr-1">
              <Button
                type="button"
                onClick={handleClose}
                variants="secondary"
                text="Cancel"
                className="w-full"
              />
            </div>
            <div className="w-1/2 pl-1">
              <Button
                type="submit"
                variants="submit"
                text="Add Recall"
                className="w-full"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
