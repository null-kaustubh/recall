import { useRef } from "react";
import { RxCross2, RxExternalLink } from "react-icons/rx";
import useClickOutside from "../../../hooks/useClickOutside";
import { Pen, Trash2 } from "lucide-react";
import Button from "../Button";
import Badge from "../Badge";

interface RecallModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  notes: string;
  tags: string[];
  url: string;
}

export default function RecallModal(props: RecallModalProps) {
  const modalRef = useRef(null);
  useClickOutside(modalRef, props.onClose);

  if (!props.open) return null;
  const tags = props.tags;

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-[rgba(24,24,24,0.8)] backdrop-blur-[1px] flex justify-center items-center z-50">
      <div className="flex flex-col justify-center">
        <div
          ref={modalRef}
          className="bg-neutral-100 text-neutral-900 dark:bg-neutral-850 dark:text-neutral-50 opacity-100 rounded-md flex flex-col"
        >
          <div className="flex items-center p-4 justify-between w-130">
            <div className="font-normal text-2xl flex items-center">
              {props.title}
              <Button variants="secondaryIcon" icon={<Pen size={"14px"} />} />
            </div>
            <div onClick={props.onClose} className="cursor-pointer">
              <RxCross2 />
            </div>
          </div>
          <div className="px-4 mt-2">
            <div>Notes</div>
            <div className="font-extralight flex items-center my-2">
              {props.notes}
              <Button variants="secondaryIcon" icon={<Pen size={"12px"} />} />
            </div>
          </div>
          <div className="px-4 mt-4">
            <div>Tags</div>
            <div className="flex flex-wrap gap-2 my-2">
              {tags.map((tag) => {
                return <Badge variants={"input"} tag={tag} />;
              })}
            </div>
          </div>
          <div className="px-4 mt-4">
            <div>Link</div>
            <div className="bg-neutral-750 rounded-md p-3 my-2 flex justify-between items-center text-neutral-200">
              {props.url}
              <div className="flex items-center gap-2">
                <Button variants="secondaryIcon" icon={<Pen size={"14px"} />} />
                <Button variants="secondaryIcon" icon={<RxExternalLink />} />
              </div>
            </div>
          </div>
          <div className="px-4 mt-3 mb-5 flex items-center gap-2">
            <Button
              variants="secondary"
              text="Cancel"
              startIcon={<RxCross2 />}
            />
            <Button variants="primary" text="Save" />
            <Button
              variants="destructiveIcon"
              icon={<Trash2 size={"18px"} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
