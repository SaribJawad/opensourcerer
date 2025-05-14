import RepositoryCard from "@/app/_components/RepositoryCard";
import { Button } from "@/app/_components/ui/button";
import { useRepoStore } from "@/app/_providers/repoStoreProvider";
import { CiFilter } from "react-icons/ci";
import { Alert, AlertDescription } from "@/app/_components/ui/alert";
import { Info } from "lucide-react";
import { SkeletonRepositoryCard } from "@/app/_components/SkeletonRepositoryCard";
import EmptySection from "../../dashboard/_components/EmptySection";
import { useUserStore } from "@/app/_providers/userStoreProvider";
import toast from "react-hot-toast";
import { useState } from "react";

interface SearchResultProps {
  setIsSideBarOpen: (arg: boolean) => void;
  isSideBarOpen: boolean;
}

function SearchResult({ setIsSideBarOpen, isSideBarOpen }: SearchResultProps) {
  const { searchNextPageUrl, setSearchNextPageUrl } = useUserStore(
    (state) => state
  );
  const {
    exploreRepos,
    isExploreRepoLoading,
    searchRepoResult,
    isSearchRepoResultLoading,
    setSearchRepoResult,
  } = useRepoStore((state) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      const resp = await fetch(`/api/github/next-page/`, {
        method: "POST",
        body: JSON.stringify({ url: searchNextPageUrl }),
      });

      if (!resp.ok) {
        const error = await resp.json();
        toast.error(error.message);
        return;
      }
      const data = await resp.json();
      setSearchNextPageUrl(data.url);
      setSearchRepoResult(data.data);
    } catch (error) {
      let errMessage = "Something went fetching next page result";

      if (error instanceof Error) {
        errMessage = error.message;
      }

      throw new Error(errMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex-1 flex flex-col gap-4">
      <Button
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        variant="outline"
        size="lg"
        className="self-start mb-5 xl:hidden "
      >
        <CiFilter />
        Filters
      </Button>

      <Alert className=" border border-primary/20 bg-primary/5">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          {searchRepoResult
            ? "We search across the repository's name, description, and README. Try keywords like 'react', 'typescript', or 'machine learning' to discover relevant projects or you can use filter search."
            : "This explore page is constantly changing. Search for your desired repositories to find specific projects."}
        </AlertDescription>
      </Alert>
      {isExploreRepoLoading || isSearchRepoResultLoading ? (
        <div className="grid md:grid-cols-2 grid-col-1 gap-6 max-h-dvh overflow-auto pb-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonRepositoryCard key={index + 1} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-5 items-center">
          <div className="grid md:grid-cols-2 grid-col-1 gap-6 max-h-dvh overflow-auto pb-2 w-full ">
            {searchRepoResult ? (
              searchRepoResult.length > 0 ? (
                searchRepoResult.map((repo) => (
                  <RepositoryCard key={repo.id} {...repo} />
                ))
              ) : (
                <EmptySection
                  title="No results found"
                  description="We couldn't find any projects, Try using different keywords or filters."
                />
              )
            ) : (
              exploreRepos.map((repo) => (
                <RepositoryCard key={repo.id} {...repo} />
              ))
            )}
          </div>
          {searchNextPageUrl ? (
            <Button
              disabled={isLoading}
              variant="outline"
              onClick={handleLoadMore}
            >
              {isLoading ? "Loading..." : "Load more"}
            </Button>
          ) : null}
        </div>
      )}
    </section>
  );
}

export default SearchResult;
