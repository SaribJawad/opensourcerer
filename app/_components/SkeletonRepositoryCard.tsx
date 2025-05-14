import { Skeleton } from "./ui/skeleton";

export function SkeletonRepositoryCard() {
  return (
    <div className="border border-border bg-secondary/30 rounded-custom p-5 flex flex-col justify-between gap-4 shadow-sm h-56">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-[35px] w-[35px] rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        {/* repository tags */}
        <div className="flex flex-wrap items-center gap-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} className="h-6 w-16 rounded-full" />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
