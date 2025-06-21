export const fadeInOut = "transition ease-in-out duration-200 cursor-pointer";

export interface ContentItem {
  id: string;
  title: string;
  note: string;
  tags?: string[];
  createdAt?: string;
  link: string;
}
