import { RxCross2 } from "react-icons/rx";
import Button from "./Button";

export interface BadgeProps {
  variants: "primary" | "input";
  tag: string;
  onClick?: () => void;
}

export default function Badge(props: BadgeProps) {
  return (
    <div>
      {props.variants === "primary" ? (
        <div className="bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-xs px-2 py-1 rounded-full">
          {props.tag}
        </div>
      ) : (
        <div className="bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-xs px-2 py-1 rounded-full flex items-center">
          {props.tag}{" "}
          <Button
            variants="secondaryIcon"
            onClick={props.onClick}
            icon={<RxCross2 />}
          />
        </div>
      )}
    </div>
  );
}
