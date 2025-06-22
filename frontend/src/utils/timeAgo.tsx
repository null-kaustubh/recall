import { useEffect, useState } from "react";

export function getCompactTimeAgo(createdAt: string | Date): string {
  if (!createdAt) return "";

  const now = new Date();
  const created = new Date(createdAt);

  if (isNaN(created.getTime())) return "";

  const diffInMs = now.getTime() - created.getTime();

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears}y`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths}m`;
  } else if (diffInWeeks > 0) {
    return `${diffInWeeks}w`;
  } else if (diffInDays > 0) {
    return `${diffInDays}d`;
  } else if (diffInHours > 0) {
    return `${diffInHours}h`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}min`;
  } else {
    return "now";
  }
}

export function useCompactTimeAgo(
  createdAt: string,
  updateInterval: number = 60000
): string {
  const [timeAgo, setTimeAgo] = useState<string>(() =>
    getCompactTimeAgo(createdAt)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getCompactTimeAgo(createdAt));
    }, updateInterval);

    return () => clearInterval(interval);
  }, [createdAt, updateInterval]);

  return timeAgo;
}
