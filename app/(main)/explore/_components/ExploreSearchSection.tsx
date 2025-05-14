"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { useRepoStore } from "@/app/_providers/repoStoreProvider";
import { useUserStore } from "@/app/_providers/userStoreProvider";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";

function ExploreSearchSection() {
  const { setSearchNextPageUrl } = useUserStore((state) => state);
  const {
    setSearchRepoResult,
    setIsSearchRepoResultLoading,
    isSearchRepoResultLoading,
  } = useRepoStore((state) => state);
  const [searchInp, setSearchInp] = useState<string>("");

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchInp === "") {
      toast.error("Please enter a search term before searching.");
      return;
    }
    try {
      setIsSearchRepoResultLoading(true);
      setSearchRepoResult(null);
      const response = await fetch("/api/github/search", {
        method: "POST",
        body: JSON.stringify({ inp: searchInp }),
      });

      const respData = await response.json();

      setSearchNextPageUrl(respData.nextUrl);
      if (!response.ok) {
        throw new Error(respData.message || "Failed to fetch search results.");
      }
      setSearchRepoResult(respData.data);
    } catch (error) {
      console.error("Search failed:", error);
      toast.error(
        "Something went wrong while searching. Please try again later."
      );
    } finally {
      setIsSearchRepoResultLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-6 self-center   xl:w-1/2 py-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-semibold">
          Discover Open Source Projects
        </h1>
        <p className="text-muted-foreground">
          Search and explore thousands of open source projects to contribute to
        </p>
      </div>
      <div className="max-w-full flex flex-col gap-2">
        <form
          onSubmit={(e) => handleSearch(e)}
          className="flex items-center gap-2"
        >
          <div className="flex-1 relative">
            <span className="absolute top-2.5 left-2 text-muted-foreground">
              <IoIosSearch />
            </span>
            <Input
              disabled={isSearchRepoResultLoading}
              value={searchInp}
              onChange={(e) => setSearchInp(e.target.value)}
              placeholder="Search by name, description or labels..."
              className="pl-7 disabled:cursor-not-allowed"
            />
          </div>
          <Button
            disabled={isSearchRepoResultLoading}
            type="submit"
            className="shrink-0"
          >
            {isSearchRepoResultLoading ? "Searching" : "Search"}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Try searching for: &quot;react&quot;, &quot;typescript&quot;,
          &quot;machine learning&quot;, &quot;good-first-issue&quot;...
        </p>
      </div>
    </section>
  );
}

export default ExploreSearchSection;
