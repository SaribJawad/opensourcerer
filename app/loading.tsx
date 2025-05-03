import { LoadingSpinner } from "./_components/LoadingSpinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full h-dvh flex items-center justify-center bg-background">
      <LoadingSpinner size={40} className="text-[var(--color-accent)]" />
    </div>
  );
}
