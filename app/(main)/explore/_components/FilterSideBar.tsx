"use client";

import { useState, useEffect } from "react";
import FilterRadioSection from "./FilterRadioSection";
import FilterByStarsSection from "./FilterByStarsSection";
import RecentlyUpdatedCheckboxSection from "./RecentlyUpdatedCheckboxSection";
import FilterByLanguageSection from "./FilterByLanguageSection";
import { Separator } from "@/app/_components/ui/separator";
import FilterByTagSection from "./FilterByTagSection";
import { Button } from "@/app/_components/ui/button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { useRepoStore } from "@/app/_providers/repoStoreProvider";
import { useUserStore } from "@/app/_providers/userStoreProvider";

export type SortBy = "stars" | "updated" | "issues";

interface IFilterSidebar {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (arg: boolean) => void;
}

function FilterSideBar({ isSideBarOpen, setIsSideBarOpen }: IFilterSidebar) {
  const { setSearchNextPageUrl } = useUserStore((state) => state);
  const {
    setSearchRepoResult,
    setIsSearchRepoResultLoading,
    isSearchRepoResultLoading,
  } = useRepoStore((state) => state);
  const [sortBy, setSortBy] = useState<SortBy>("stars");
  const [stars, setStars] = useState<number[]>([0]);
  const [language, setLanguage] = useState<string>();
  const [updatedInLast30Days, setUpdatedInLast30Days] =
    useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);

  const [isOverlayVisible, setIsOverlayVisible] =
    useState<boolean>(isSideBarOpen);

  useEffect(() => {
    if (isSideBarOpen) {
      setIsOverlayVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsOverlayVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isSideBarOpen]);

  const handleFilterByLanguage = (language: string) => {
    setLanguage(language);
  };

  const handleFilterByTags = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? [...prev.filter((t) => t === tag)] : [...prev, tag]
    );
  };

  const handleReset = () => {
    setSortBy("stars");
    setStars([0]);
    setLanguage(undefined);
    setUpdatedInLast30Days(false);
    setTags([]);
  };

  const handleApplyFilters = async () => {
    if (!language) {
      toast.error("Select a language");
      return;
    }
    const body = {
      sortBy,
      stars: stars[0],
      language: language,
      updatedInLast30Days,
      tags,
    };
    try {
      setIsSearchRepoResultLoading(true);
      setSearchRepoResult(null);
      const response = await fetch("/api/github/search", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const data = await response.json();

      setSearchNextPageUrl(data.nextUrl);

      setSearchRepoResult(data.data);
    } catch (error) {
      let errorMessage = "Something went wrong! Try again";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    } finally {
      setIsSearchRepoResultLoading(false);
    }
  };

  return (
    <>
      {isOverlayVisible && (
        <div
          onClick={() => setIsSideBarOpen(false)}
          className={`h-dvh w-full bg-black/60 xl:hidden absolute left-0 top-0 z-40 transition-opacity duration-300 ${
            isSideBarOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>
      )}
      <section
        className={`w-[300px] lg:max-h-none max-h-dvh border-r border-border h-full shrink-0 absolute xl:z-10 z-50 transition-all duration-300 bg-background flex flex-col gap-5 ${
          isSideBarOpen ? "left-0" : "-left-[300px]"
        } top-0 xl:static`}
      >
        <div className="xl:hidden p-3 flex gap-2">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">Filters</h2>
            <p className="text-sm text-muted-foreground">
              Apply filters to find the perfect open source project.
            </p>
          </div>
          <Button
            onClick={() => setIsSideBarOpen(false)}
            variant="outline"
            size="icon"
          >
            <IoClose />
          </Button>
        </div>

        <ScrollArea className="h-20 w-full rounded-md flex-1">
          <div className="flex flex-col gap-5 lg:pr-4 p-3 ">
            <FilterRadioSection sortBy={sortBy} setSortBy={setSortBy} />
            <Separator className="" />

            <FilterByStarsSection stars={stars} setStars={setStars} />
            <Separator className="" />

            <RecentlyUpdatedCheckboxSection
              isChecked={updatedInLast30Days}
              setIsChecked={setUpdatedInLast30Days}
            />
            <Separator className="" />
            <FilterByLanguageSection
              filterLanguages={language}
              handleFilterByLanguages={handleFilterByLanguage}
            />
            <Separator className="" />
            <FilterByTagSection
              handleFilterByTags={handleFilterByTags}
              tags={tags}
            />
            <Separator className="" />
          </div>
        </ScrollArea>

        <div className="w-full flex flex-col gap-2 shrink-0 p-3">
          <Button
            disabled={isSearchRepoResultLoading}
            onClick={handleApplyFilters}
          >
            {isSearchRepoResultLoading ? "Searching..." : "Filter Search"}
          </Button>
          <Button
            disabled={isSearchRepoResultLoading}
            variant="outline"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </section>
    </>
  );
}

export default FilterSideBar;
