"use client";

import { useEffect, useState } from "react";
import ExploreSearchSection from "./_components/ExploreSearchSection";
import FilterSideBar from "./_components/FilterSideBar";
import SearchResult from "./_components/SearchResult";
// import { useSession } from "next-auth/react";

function ExplorePage() {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] =
    useState<boolean>(false);
  //   const { data: session } = useSession();
  //   console.log(session);

  useEffect(() => {
    if (isFilterSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isFilterSidebarOpen]);

  return (
    <main className="pt-20  w-full p-5 h-full bg-background">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-10 h-full">
        <ExploreSearchSection />
        <div className="flex items-start gap-4 ">
          <FilterSideBar
            isSideBarOpen={isFilterSidebarOpen}
            setIsSideBarOpen={setIsFilterSidebarOpen}
          />
          <SearchResult
            isSideBarOpen={isFilterSidebarOpen}
            setIsSideBarOpen={setIsFilterSidebarOpen}
          />
        </div>
      </div>
    </main>
  );
}

export default ExplorePage;
