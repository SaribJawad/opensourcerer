import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { IoIosSearch } from "react-icons/io";

function ExploreSearchSection() {
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
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <span className="absolute top-2.5 left-2 text-muted-foreground">
              <IoIosSearch />
            </span>
            <Input
              placeholder="Search by name, description or labels..."
              className="pl-7"
            />
          </div>
          <Button className="shrink-0">Search</Button>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Try searching for: &quot;react&quot;, &quot;typescript&quot;,
          &quot;machine learning&quot;, &quot;good-first-issue&quot;...
        </p>
      </div>
    </section>
  );
}

export default ExploreSearchSection;
