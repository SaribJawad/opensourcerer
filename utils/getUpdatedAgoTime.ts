export function getUpdatedAgoTime(updatedAt: string) {
  const date = new Date(updatedAt);
  const currentDate = new Date();

  const msDiff = currentDate.getTime() - date.getTime();

  const seconds = Math.floor(msDiff / 1000);
  const minutes = Math.floor(msDiff / (1000 * 60));
  const hours = Math.floor(msDiff / (1000 * 60 * 60));
  const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
}
