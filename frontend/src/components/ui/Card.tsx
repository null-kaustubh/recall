import { RxExternalLink, RxTwitterLogo } from "react-icons/rx";
import { fadeInOut } from "./default";

interface CardProps {
  title?: string;
  author?: string;
  date?: string;
  onClick?: () => void;
}

export default function Card(props: CardProps) {
  return (
    <div onClick={props.onClick}>
      <div
        className={`group flex items-center justify-between rounded-lg bg-white dark:bg-neutral-850 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 px-4 py-4 ${fadeInOut}`}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div>
            <RxTwitterLogo />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-sm text-neutral-800 dark:text-neutral-200 truncate">
              {props.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {props.author}
              </span>
              <span className="text-xs text-neutral-400 dark:text-neutral-500">
                ·
              </span>
              <span className="text-xs text-neutral-400 dark:text-neutral-500">
                {props.date}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-3">
          <RxExternalLink className="h-4 w-4 text-neutral-400 dark:text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );
}
