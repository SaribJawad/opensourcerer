import ExploreSearchSection from "./_components/ExploreSearchSection";

import ExploreSearchAndFilter from "./_components/ExploreSearchAndFilter";

export const metadata = {
  title: "Explore | OpenSourcerer",
  description:
    "Discover trending repositories, open-source projects, and more.",
};

function ExplorePage() {
  return (
    <main className="pt-20  w-full p-5 h-full bg-background">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-10 h-full">
        <ExploreSearchSection />
        <ExploreSearchAndFilter />
      </div>
    </main>
  );
}

export default ExplorePage;
