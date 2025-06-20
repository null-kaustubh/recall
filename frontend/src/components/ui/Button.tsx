import { type ReactElement } from "react";
import { fadeInOut } from "./default";

export interface ButtonProps {
  variants:
    | "primary"
    | "secondary"
    | "icon"
    | "destructiveIcon"
    | "secondaryIcon"
    | "submit";
  text?: string;
  icon?: ReactElement;
  startIcon?: ReactElement;
  onClick?: () => void;
}

const variantStyles = {
  primary:
    "h-10 bg-neutral-700 hover:bg-neutral-600 text-neutral-200 hover:text-neutral-50 rounded-md px-3 py-2",
  secondary:
    "h-10 bg-neutral-800 text-neutral-300 border-neutral-500 rounded-md border-1 px-3 py-2 hover:bg-neutral-750 hover:text-neutral-50",
  icon: "h-10 w-10 p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md",
  secondaryIcon:
    "pl-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200",
  destructiveIcon:
    "h-10 w-10 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-md",
  submit:
    "h-10 w-full bg-neutral-700 hover:bg-neutral-600 text-neutral-200 hover:text-neutral-50 rounded-md px-3 py-2",
};

export default function Button(props: ButtonProps) {
  const variant = props.variants;
  const text = props.text;
  const icon = props.icon;
  const startIcon = props.startIcon;

  return (
    <button className={`${variantStyles[variant]} ${fadeInOut}`}>
      {variant === "icon" ||
      variant === "secondaryIcon" ||
      variant === "destructiveIcon" ? (
        <div className="flex items-center justify-center">{icon}</div>
      ) : (
        <div className="flex items-center gap-2 justify-center">
          {startIcon}
          {text}
        </div>
      )}
    </button>
  );
}
