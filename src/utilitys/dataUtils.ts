import { formatDistanceToNow, format } from "date-fns";
import { ko } from "date-fns/locale";

export function timeAgo(createdAt: string): string {
  return formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ko,
  });
}

export function formatDate(createdAt: string): string {
  return format(new Date(createdAt), "yyyy.MM.dd"); // "2024.12.26" 형식
}
