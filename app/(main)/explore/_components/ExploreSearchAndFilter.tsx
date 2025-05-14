"use client";

import { useEffect, useState } from "react";
import FilterSideBar from "./FilterSideBar";
import SearchResult from "./SearchResult";

function ExploreSearchAndFilter() {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (isFilterSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isFilterSidebarOpen]);

  return (
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
  );
}

export default ExploreSearchAndFilter;
