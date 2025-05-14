"use client";

import SavedRepoCard from "./SavedRepoCard";
import { useUserStore } from "@/app/_providers/userStoreProvider";
import { useQuery } from "@tanstack/react-query";
import { SkeletonRepositoryCard } from "@/app/_components/SkeletonRepositoryCard";
import toast from "react-hot-toast";
import EmptySection from "./EmptySection";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

export interface IBookmarkedRepo {
  owner: string;
  githubLink: string;
  repoId: string;
  image: string;
  name: string;
  description: string;
  topics?: string[];
  stars: string;
  forks: string;
  issues: string;
}

function BookmarkedReposSection() {
  const { setBookmarkedRepos, bookmarkedRepos } = useUserStore(
    (state) => state
  );

  const { isLoading } = useQuery({
    queryKey: ["bookmarkedRepos"],
    queryFn: async () => {
      const res = await fetch(
        "https://opensourcerer.vercel.app/api/user/get-bookmarked-repos",
        {
          method: "GET",
        }
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return [];
      }

      setBookmarkedRepos(data.bookmarkedRepos);

      return data;
    },
  });

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 max-h-dvh overflow-auto  pb-2">
      {isLoading ? (
        Array.from({ length: 2 }).map((_, index) => (
          <SkeletonRepositoryCard key={index + 1} />
        ))
      ) : bookmarkedRepos.length > 0 ? (
        bookmarkedRepos.map((repo, index) => (
          <SavedRepoCard key={index} {...repo} />
        ))
      ) : (
        <EmptySection
          title="No bookmarks yet"
          description="You haven't bookmarked any repositories. Try exploring and saving some to see them here!"
        >
          <Link href="/explore">
            <Button>Explore</Button>
          </Link>
        </EmptySection>
      )}
    </div>
  );
}

export default BookmarkedReposSection;
