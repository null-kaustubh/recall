import { RxExternalLink } from "react-icons/rx";
import { fadeInOut } from "./default";
import { useCompactTimeAgo } from "../../utils/timeAgo";
import getIcon from "../../utils/getIcon";
import Badge from "./Badge";

interface CardProps {
  id: string;
  title?: string;
  url?: string;
  author?: string;
  createdAt?: string;
  tags?: string[];
  onClick?: () => void;
}

export default function Card(props: CardProps) {
  const timeAgo = useCompactTimeAgo(props.createdAt!);

  const renderTags = () => {
    if (!props.tags || props.tags.length === 0) return null;

    const maxVisibleTags = 3;
    const visibleTags = props.tags.slice(0, maxVisibleTags);
    const remainingCount = props.tags.length - maxVisibleTags;

    return (
      <div className="flex items-center gap-1 mt-1">
        {visibleTags.map((tag, index) => (
          <Badge key={index} variants="primary" tag={tag} />
        ))}
        {remainingCount > 0 && (
          <Badge variants="primary" tag={`+${remainingCount}`} />
        )}
      </div>
    );
  };

  return (
    <div
      className={`group flex items-center justify-between rounded-lg bg-white dark:bg-neutral-850 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 px-4 py-4 ${fadeInOut} my-4`}
      onClick={props.onClick}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {props.url && (
          <div className="text-xl text-neutral-500 dark:text-neutral-400">
            {getIcon(props.url)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-sm text-neutral-800 dark:text-neutral-200 truncate">
            {props.title}
          </h3>
          {/* Date and Author */}
          <div className="flex items-center gap-2 mt-1">
            {(props.author || timeAgo) && (
              <div className="text-xs text-neutral-500 dark:text-neutral-500">
                {props.author && <span>{props.author}</span>}
                {props.author && timeAgo && <span>·</span>}
                {timeAgo && <span>{timeAgo}</span>}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-3">
        {/* Tags */}
        {renderTags()}
        <RxExternalLink className="h-4 w-4 text-neutral-500 dark:text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
