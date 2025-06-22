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
  className?: string;
  type?: "button" | "submit" | "reset";
}

const variantStyles = {
  primary:
    "h-10 bg-neutral-200 text-neutral-900 font-semibold rounded-lg px-4 py-2 hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105",
  secondary:
    "h-10 bg-neutral-800 text-neutral-300 border border-neutral-700 rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-red-950 hover:text-red-500 hover:border-red-500 hover:shadow-md",
  icon: "h-10 w-10 p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all duration-200",
  secondaryIcon:
    "pl-2 text-neutral-400 hover:text-white font-medium transition-all duration-200 hover:underline",
  destructiveIcon:
    "h-10 w-10 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-all duration-200",
  submit:
    "h-10 w-full bg-neutral-700 text-white font-semibold rounded-lg px-6 py-2 hover:bg-green-800 transition-all duration-300 shadow-md hover:shadow-lg",
};

export default function Button(props: ButtonProps) {
  const variant = props.variants;
  const text = props.text;
  const icon = props.icon;
  const startIcon = props.startIcon;
  const className = props.className;

  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      className={`${variantStyles[variant]} ${fadeInOut} ${className}`}
    >
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
