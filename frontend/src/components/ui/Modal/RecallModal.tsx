import { useRef } from "react";
import { RxCross2, RxExternalLink } from "react-icons/rx";
import useClickOutside from "../../../hooks/useClickOutside";
import { Pen, Trash2 } from "lucide-react";
import Button from "../Button";
import Badge from "../Badge";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

interface RecallModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  id: string;
  title: string;
  note: string;
  tags: string[];
  link: string;
}

export default function RecallModal(props: RecallModalProps) {
  const modalRef = useRef(null);
  useClickOutside(modalRef, props.onClose);

  if (!props.open) return null;
  const tags = props.tags;

  async function deleteRecall(id: string) {
    try {
      console.log("deleting: ", id);
      await axios.delete(`${BACKEND_URL}api/content`, {
        data: { contentId: id },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      props.onDelete();
    } catch (e) {
      console.error(`Error in deleting recall ${e}`);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-neutral-850 text-neutral-50 rounded-lg shadow-xl w-full max-w-lg flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-700">
          <div className="font-semibold text-xl flex items-center gap-2">
            <span className="truncate">{props.title}</span>
            <Button variants="secondaryIcon" icon={<Pen size={"14px"} />} />
          </div>
          <Button onClick={props.onClose} variants="icon" icon={<RxCross2 />} />
        </div>

        <div className="p-4 space-y-6 overflow-y-auto max-h-[70vh]">
          <div>
            <div className="text-sm font-medium text-neutral-400 mb-2">
              Notes
            </div>
            <div className="text-neutral-200 flex items-center justify-between">
              {props.note || (
                <span className="text-neutral-500">No note added.</span>
              )}
              <Button variants="secondaryIcon" icon={<Pen size={"12px"} />} />
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-neutral-400 mb-2">
              Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <Badge key={tag} variants={"input"} tag={tag} />
                ))
              ) : (
                <span className="text-neutral-500 text-sm">No tags added.</span>
              )}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-neutral-400 mb-2">
              Link
            </div>
            <div className="bg-neutral-750 rounded-md p-3 flex items-center justify-between gap-4">
              <a
                href={props.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline truncate"
                title={props.link}
              >
                {props.link}
              </a>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variants="secondaryIcon" icon={<Pen size={"14px"} />} />
                <Button
                  variants="secondaryIcon"
                  icon={<RxExternalLink />}
                  onClick={() => window.open(props.link, "_blank")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 border-t border-neutral-700 bg-neutral-800 rounded-b-lg">
          <Button
            variants="destructiveIcon"
            icon={<Trash2 size={"18px"} />}
            onClick={() => deleteRecall(props.id)}
          />
          <div className="flex-grow flex items-center gap-2">
            <Button
              onClick={props.onClose}
              variants="secondary"
              text="Cancel"
              className="w-full"
            />
            <Button variants="submit" text="Save" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
