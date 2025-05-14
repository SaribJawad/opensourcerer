"use client";

import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import RepositoryCard from "./RepositoryCard";
import { useEffect } from "react";
import { useRepoStore } from "../_providers/repoStoreProvider";
import toast from "react-hot-toast";
import { SkeletonRepositoryCard } from "./SkeletonRepositoryCard";

function TrendingSection() {
  const {
    setIsTrendingReposLoading,
    isTrendingReposLoading,
    trendingRepos,
    setTrendingRepos,
  } = useRepoStore((state) => state);

  useEffect(() => {
    const fetchTrendingRepos = async () => {
      try {
        const response = await fetch("/api/github/trending-repos");
        const data = await response.json();

        setTrendingRepos(data.data);
      } catch (error) {
        console.error("Fetching trending repos failed:", error);
        toast.error("Something went wrong while fetching trending repos");
      } finally {
        setIsTrendingReposLoading(false);
      }
    };

    fetchTrendingRepos();
  }, [setTrendingRepos, setIsTrendingReposLoading]);

  return (
    <section className="w-full p-5">
      <div className="max-w-[1400px] mx-auto py-20 flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h1 className="md:text-3xl text-2xl font-semibold">
            Trending <span className="text-accent">Projects</span>
          </h1>
          <Link
            href="https://github.com/trending"
            target="_blank"
            className="text-accent flex items-center gap-1 hover:underline hover:text-accent/90 color-hover md:text-base text-sm"
          >
            View all
            <GoArrowUpRight />
          </Link>
        </div>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {isTrendingReposLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <SkeletonRepositoryCard key={index + 1} />
              ))
            : trendingRepos.map((repo, index) => (
                <RepositoryCard key={index} {...repo} />
              ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingSection;
