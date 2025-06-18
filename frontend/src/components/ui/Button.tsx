import type { ReactElement } from "react";

export interface ButtonProps {
  variants: "primary" | "secondary" | "icon";
  size?: "sm" | "md" | "lg";
  text?: string;
  icon?: ReactElement;
  startIcon?: ReactElement;
  onClick: () => void;
}

export default function Button(props: ButtonProps) {}
