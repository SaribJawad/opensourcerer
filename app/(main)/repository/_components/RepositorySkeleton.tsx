import { Skeleton } from "@/app/_components/ui/skeleton";

function RepositorySkeleton() {
  return (
    <div className="max-w-[1400px] mx-auto flex flex-col  gap-6 w-full h-full">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-16" />
        <span>/</span>
        <Skeleton className="h-5 w-24" />
      </div>

      {/* Repo Header Skeleton */}
      <div className="flex lg:flex-row flex-col items-start justify-between gap-3">
        {/* Left Side */}
        <div className="flex items-start gap-4">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-36 rounded-md" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default RepositorySkeleton;
