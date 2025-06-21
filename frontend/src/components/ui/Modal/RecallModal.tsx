import { useRef } from "react";
import { RxCross2, RxExternalLink } from "react-icons/rx";
import useClickOutside from "../../../hooks/useClickOutside";
import { Pen, Trash2 } from "lucide-react";
import Button from "../Button";
import Badge from "../Badge";
import axios from "axios";
import { BACKEND_DEV, BACKEND_URL } from "../../../config";

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
              <Button variants="secondaryIcon" icon={<RxCross2 />} />
            </div>
          </div>
          <div className="px-4 mt-2">
            <div>Notes</div>
            <div className="font-extralight flex items-center my-2">
              {props.note}
              {props.note.length > 0 ? (
                <Button variants="secondaryIcon" icon={<Pen size={"12px"} />} />
              ) : (
                <div>
                  <span className="font-extralight items-center my-2">
                    add note
                  </span>
                  <Button
                    variants="secondaryIcon"
                    icon={<Pen size={"12px"} />}
                  />
                </div>
              )}
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
            <div className="bg-neutral-750 rounded-md p-3 my-2 text-neutral-200">
              <div className="flex items-center">
                <div
                  className="overflow-hidden text-ellipsis whitespace-nowrap flex-shrink"
                  style={{ width: "400px", maxWidth: "400px" }}
                  title={props.link}
                >
                  {props.link}
                </div>
                <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                  <Button
                    variants="secondaryIcon"
                    icon={<Pen size={"14px"} />}
                  />
                  <Button
                    variants="secondaryIcon"
                    icon={<RxExternalLink />}
                    onClick={() =>
                      props.link && window.open(props.link, "_blank")
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 mt-3 mb-5 flex items-center gap-2">
            <div onClick={props.onClose} className="cursor-pointer">
              <Button variants="secondary" text="Cancel" className="w-50" />
            </div>
            <div className="w-full">
              <Button variants="submit" text="Save" />
            </div>
            <Button
              variants="destructiveIcon"
              icon={
                <Trash2
                  size={"18px"}
                  className="w-10"
                  onClick={() => deleteRecall(props.id)}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
